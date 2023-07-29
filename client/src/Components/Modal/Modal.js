import React from "react";
import "./Modal.css";

// children: The content to be displayed inside the modal
// isOpen: A boolean value representing whether the modal is open or not
// onClose: A function to be called when the modal is closed
// title: The title of the modal

export default function({children, isOpen, onClose, title}) {
    // Function to handle the close event of the modal
    const close = () => {
        onClose();
    };
    return(
        // The div element with class 'modal', and additional class 'modal--active' if 'isOpen' is true
        <div className={`modal${isOpen ? ' modal--active' : ''}`}>
            <div className="modal__content">
                {/* &times; represents x*/}
                <span className="modal__close" onClick={close}>&times;</span>
                <h3 className="modal__title">{title}</h3>
                {children}
            </div>
        </div>
    )
}