import React from "react";
import { FaFacebook, FaInstagram, FaGithubAlt } from "react-icons/fa";
export const Footer = () => {

    return (<footer>
        <div className="footer-item">
            <h3>By Jorge Valencia</h3>
        </div>
        <div className="footer-item">
            <div className="item">
                <FaFacebook />
            </div>
            <div className="item">
                <FaInstagram />
            </div>
            <div className="item">
                <FaGithubAlt />
            </div>
        </div>
    </footer>);

}