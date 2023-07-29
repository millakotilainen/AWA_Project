import React, {useState} from "react";
import FormErrors from "../../Components/FormErrors/FormErrors";
import validator from "validator";
import Button from "../../Components/Button/Button";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import HttpClient from "../../Services/HttpClient";

export default function (){
    // Get the 'history' object from 'react-router-dom' to handle navigation
    const history = useHistory();
    // State variables to store user's name, email, password, password confirmation and any errors
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    // Function to handle form submission
    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!name) _errors.push('Name is required');
        if (!validator.isEmail(email)) _errors.push('Email format is incorrect');
        if (!password) _errors.push('Password is required');
        if (!passwordAgain) _errors.push('Password confirmation is required');
        if (password !== passwordAgain) _errors.push('Passwords must be the same');

        if (_errors.length) return setErrors(_errors);

        const data = {
            name,
            email,
            password
        };

        try{
            // Send a POST request to the server to register the user
            await HttpClient().post('/api/user/register', data);
            // If registration is successful, redirect the user to the login page
            history.push('/auth/login');
        } catch (e) {
            setErrors([e.response.data.message]);
        }

        
    };

    return (
        <div className="page">
            <h1 className="page__title">Register</h1>

            <form onSubmit={onSubmit} className="form">
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group">
                    <label className="form__label">Name</label>
                    <input type="text" className="form__input" value ={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">Email</label>
                    <input type="text" className="form__input" value ={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">Password</label>
                    <input type="password" className="form__input" value ={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form__group">
                    <label className="form__label">Password Again</label>
                    <input type="password" className="form__input" value ={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}/>
                </div>
                <Button type="submit">Register</Button> 
            </form>
        </div>
    )
}