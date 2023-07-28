import React from "react";
import "./Modal.css";

export default function({children, isOpen, onClose, title}) {
    const close = () => {
        onClose();
    };
    return(
        <div className={`modal${isOpen ? ' modal--active' : ''}`}>
            <div className="modal__content">
                <span className="modal__close" onClick={close}>&times;</span>
                <h3 className="modal__title">{title}</h3>
                {children}
            </div>
        </div>
    )
}