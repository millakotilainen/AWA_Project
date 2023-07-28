import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../Components/Modal/Modal";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import AppContext from "../../../Contexts/AppContext";
import axios from "axios";

export default function ({isOpen, onClose}) {
    const {user, setUser} = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        
        if (!name) return setErrors(['Name is required']);
        else if (name === user.name) return setErrors(['New name cannot be the same as your current one']);


        //const token = localStorage.getItem("token");
        const data = {
            name,
            userId: user._id
        };

        await axios.post('/api/user/change-name', data);

        setUser({
            ...user,
            name
        });
        onClose();
    };

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Name">
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group">
                    <label className="form__label">Name</label>
                    <input className="form__input" value={name} onChange={e => setName(e.target.value)}/>
                </div>

                <Button type="submit">Change</Button>
            </form>
        </Modal>
    )
}