import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Cover2= () => {

    return <footer>
        <div className="footer-item">
            <h3>By Jorge Valencia</h3>
        </div>
        <div className="footer-item">
            <a href=""><FaFacebook/></a>
        </div>
        <div className="footer-item">
            <a href=""><FaInstagram/></a>
        </div>
    </footer>;
    
}
export default Cover2;