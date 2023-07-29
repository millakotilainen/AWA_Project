import React from "react";
import "./Button.css";

// className: Additional classes to be applied to the button for custom styling
// children: The content inside the button, eg. text
// type: The type of the button
export default function ({className, children, type, onClick}) {
    return(
        <button className={`btn ${className ? className: ''}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}