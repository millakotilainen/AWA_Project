import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AppContext from "../../Contexts/AppContext";

export default function() {
    const {logout, user} = useContext(AppContext);
    return (
        <div className="navbar">
            <span className="navbar__logo">GeekGathering</span>

            <ul className="navbar__list">
                <li className="navbar__item">
                    <Link to="/" className="navbar__link">Home</Link>
                </li>
                {!user ? <li className="navbar__item navbar__submenu-container">
                    <button className="navbar__link">Account</button>
                    <ul className="navbar__submenu">
                        <li className="navbar__submenu-item">
                            <Link to="/auth/login" className="navbar__submenu-link">Login</Link>
                        </li>
                        <li className="navbar__submenu-item">
                            <Link to="/auth/register" className="navbar__submenu-link">Register</Link>
                        </li>
                    </ul>
                </li> : (
                    <li className="navbar__item navbar__submenu-container">
                        <button className="navbar__link">{user.name}</button>
                        <ul className="navbar__submenu">
                            <li className="navbar__submenu-item">
                                <Link to="/profile" className="navbar__submenu-link">Profile</Link>
                            </li>
                            <li className="navbar__submenu-item">
                                <a href="#" onClick={logout} className="navbar__submenu-link">Logout</a>
                            </li>
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    )
}