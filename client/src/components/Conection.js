import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import JoinRoom from "./JoinRoom";
import useUser from "../hooks/useUser";

export default function Connection() {
const { isLogged } = useUser();
const [socket, setSocket] = useState(io());
const navigate = useNavigate();
useEffect(() => {
    if (!isLogged) {
        alert("You have to log in to access this part of the page.");
        setSocket(null);
        navigate("/login");
    }
}, [isLogged, navigate]);
    return <JoinRoom socket={socket} />;
}
