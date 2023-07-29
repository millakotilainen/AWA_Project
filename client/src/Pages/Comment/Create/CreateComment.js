import React, { useContext, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import AppContext from "../../../Contexts/AppContext";
import { useHistory, useParams } from "react-router-dom";

export default function() {
    // Get the 'threadId' parameter from the URL using 'useParams' hook
    const [threadId] = useParams();
    // Get the 'history' object from 'react-router-dom' to handle navigation
    const history = useHistory();
    // State variables to store form errors, title, and description
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Function to handle form submission
    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if (!description) return setErrors(['Description is required']);

        // Prepare the data to be sent in the POST request
        const data = {
            threadId,
            description
        };

        // Make a POST request to create a new comment using the 'HttpClient' service
        const response = await HttpClient().post('/api/thread/create', data);
        // Redirect to the newly created thread's page
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
                    <input className="form__input" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <Button type="submit">Create</Button>
            </form>
        </div>
    )
    
}