import React from "react";
import { useState } from "react";
import foto from "../assets/images/logo.png";
import { FiAlignJustify } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Menu } from "./MenuElements";
import useUser from "../hooks/useUser"

export const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const {isLogged, logout} = useUser();
    return <header>
        <div className="title">
            <img src={foto} alt="Logotipo de la empresa" />
            <h1>OnlineChat</h1>
        </div>
        <div className="hambur-logo" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <FiAlignJustify />
        </div>
        <Menu open={showMobileMenu}>
            
            <NavLink exact to="/" className={(navData) => (navData.isActive ? "active" : '')} >Home</NavLink>
            { isLogged ?
            <button onClick={logout}>Logout</button>
            :
            <>
            <NavLink exact to="/register" className={(navData) => (navData.isActive ? "active" : '')}>Register </NavLink>
            <NavLink exact to="/login" className={(navData) => (navData.isActive ? "active" : '')}>Log In</NavLink></>
            }
            
        </Menu>
    </header>;
}
