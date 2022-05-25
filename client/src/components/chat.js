import React from "react";
import { Footer } from "../Layout/footer";
import { Header } from "../Layout/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";


const Chat = () => {
    const { isLogged } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogged){
            alert("You have to log in to access this part of the page.")
            navigate("/login")
        } 
    }, [isLogged, navigate])
    return (<>
        <Header />
        <div className="Usuarios">
            
        </div>
        <Footer />
    </>);

}
export default Chat;