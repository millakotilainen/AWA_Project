import React from "react";
import "./FormErrors.css";

// errors: An array of error messages to be displayed in the form
export default function ({errors}){
    return (
        <div className="form-errors">
            {errors.length > 1 ? (
                // If there are more than one errors, render them as list
                <ul>
                    {errors.map((error, index) => (
                        <li>{error}</li>
                    ))}
                </ul>
            ): (
                // If there is only one error, render it as a single span element
                <span>{errors[0]}</span>
            )}
        </div>
    )
}