import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../Components/Modal/Modal";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import AppContext from "../../../Contexts/AppContext";
import axios from "axios";
import validator from "validator";

export default function ({isOpen, onClose}) {
    const {user, setUser} = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        
        if (!validator.isEmail(email)) return setErrors(['Email needs to be in correct format']);
        else if (email === user.email) return setErrors(['New email cannot be the same as your current one']);


        //const token = localStorage.getItem("token");
        const data = {
            email,
            userId: user._id
        };

        try {
            await axios.post('/api/user/change-email', data);

            setUser({
                ...user,
                email
            });
            onClose();
        } catch (e){
            setErrors([e.response.data.message]);
        }
        
    };

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Email">
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group">
                    <label className="form__label">Email</label>
                    <input className="form__input" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <Button type="submit">Change</Button>
            </form>
        </Modal>
    )
}