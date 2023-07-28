import React, { useContext, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import AppContext from "../../../Contexts/AppContext";
import { useHistory } from "react-router-dom";

export default function() {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if (!title) return setErrors(['Title is required']);

        if (!description) return setErrors(['Description is required']);

        const data = {
            title,
            description
        };

        const response = await HttpClient().post('/api/thread/create', data);
        history.push(`/thread/${response.data._id}`);
    }

    return (
        <div className="page">
            <h1 className="page__title">Create Thread</h1>
            <form className="form" onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group mb-1">
                    <label className="form__label">Title:</label>
                    <input className="form__input" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Description:</label>
                    <textarea className="form__description" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <Button type="submit">Create</Button>
            </form>
        </div>
    )
    
}