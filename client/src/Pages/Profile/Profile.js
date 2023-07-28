import React, {useState} from "react";
import Button from "../../Components/Button/Button";
import ChangeName from "./ChangeName/ChangeName";

import "./Profile.css";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import ChangePassword from "./ChangePassword/ChangePassword";

export default function() {
    const [isNameOpen, setNameOpen] = useState(false);
    const [isEmailOpen, setEmailOpen] = useState(false);
    const [isPasswordOpen, setPasswordOpen] = useState(false);


    return(
        <div className="page">
            <h1 className="page__title">Profile</h1>

            <div className="profile__buttons">
                <Button type="button" onClick={() => setNameOpen(true)}>Change Name</Button>
                <Button type="button" onClick={() => setEmailOpen(true)}>Change Email</Button>
                <Button type="button" onClick={() => setPasswordOpen(true)}>Change Password</Button>
            </div>
            
            <ChangeName isOpen={isNameOpen} onClose={() => setNameOpen(false)}/>
            <ChangeEmail isOpen={isEmailOpen} onClose={() => setEmailOpen(false)}/>
            <ChangePassword isOpen={isPasswordOpen} onClose={() => setPasswordOpen(false)}/>
        </div>
    )             
}