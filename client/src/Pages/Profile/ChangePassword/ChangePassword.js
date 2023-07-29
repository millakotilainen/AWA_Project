import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../Components/Modal/Modal";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import AppContext from "../../../Contexts/AppContext";
import axios from "axios";

export default function ({isOpen, onClose}) {
    // Get the 'user' and 'setUser' functions from the AppContext
    const {user, setUser} = useContext(AppContext);
    // State variables to manage the state of the modal, store the current and new passwords, and handle any form validation errors
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    // Function to handle form submission
    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];
        
        if (!currentPassword) _errors.push("Current password is required");
        if (!password) _errors.push('New password is required');
        if (!passwordAgain) _errors.push('New password confirmation is required');
        if (password !== passwordAgain) _errors.push('Passwords must be the same');

        if (_errors.length) return setErrors(_errors);

        const data = {
            currentPassword,
            password,
            userId: user._id
        };

        try {
            // Make a POST request to the server's '/api/user/change-password' endpoint to update the user's password
            await axios.post('/api/user/change-password', data);
            // Close the modal after a successful password change
            onClose();
            // Clear the input fields for current password, new password, and password confirmation
            setCurrentPassword("");
            setPassword("");
            setPasswordAgain("");
        } catch (e){
            setErrors([e.response.data.message]);
        }
        
    };

    // Function to close the modal
    const closeModal = () => {
        onClose();
    };

    // Update the state of the modal when the 'isOpen' prop changes
    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Password">
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group">
                    <label className="form__label">Current Password</label>
                    <input className="form__input" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">New Password</label>
                    <input className="form__input" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">New Password Again</label>
                    <input className="form__input" type="password" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}/>
                </div>

                <Button type="submit">Change</Button>
            </form>
        </Modal>
    )
}