import React from "react";
import "./Button.css";

export default function ({className, children, type, onClick}) {
    return(
        <button className={`btn ${className ? className: ''}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}