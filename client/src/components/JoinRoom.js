import React from "react";
import { Footer } from "../Layout/footer";
import { Header } from "../Layout/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import io from "socket.io-client";
import Chat from './Chat'
import User from '../hooks/user'
import Table from "../hooks/Table";
import Rooms from "../hooks/Rooms";

const JoinRoom = () => {
    const { isLogged } = useUser();
    const { names, get } = User();
    const { check, flag } = Rooms()
    const navigate = useNavigate();
    const [nameRoom, setName] = useState();
    const [passwdRoom, setPasswd] = useState();
    const [socket, setSocket] = useState(io());
    const [type, setType] = useState("P");
    const [showChat, setValue] = useState(false);
    const [error, setError] = useState(false);
    get();
    const joinroom = async () => {

        switch (type) {
            case "P":
                if (nameRoom !== "") {

                    console.log(nameRoom);
                    console.log(socket);
                    socket.emit("join_room", nameRoom);
                    setValue(true);
                } else {
                    setError(true);
                }
                break;
            case "S":
                check(nameRoom, passwdRoom);
                if (flag) {
                    socket.emit("join_room", nameRoom);
                    setValue(true);
                } else {
                    setError(true);
                }
                break;
        }
    }
    useEffect(() => {
        if (!isLogged) {
            alert("You have to log in to access this part of the page.");
            setSocket(null);
            navigate("/login");
        }
    }, [isLogged, navigate]);
    return (<>
        <Header />
        <main>{showChat ? <Chat socket={socket} username={names} nameRoom={nameRoom} />
            : <>
                <section className="form-register">


                    <h1>Join A Chat</h1>
                    {error && <p className="error"> Creadentials are invalid</p>}

                    <>
                        <label htmlFor="type">Room Types</label>
                        <select className="inputs" name="type" onChange={(event) => { setType(event.target.value); }}>
                            <option value="P">Public</option>
                            <option value="S">Private</option>
                        </select>
                    </>

                    {type === "P" ?
                        <>
                            <label htmlFor="name">Name Room</label>
                            <input className="inputs" type="text" placeholder="My Room..." id="name" onChange={(event) => { setName(event.target.value); }} />
                            <button onClick={joinroom}>Join A Room</button></>
                        :
                        <>
                            <label htmlFor="name">Name Room</label>
                            <input className="inputs" type="text" placeholder="My Room..." id="" onChange={(event) => { setName(event.target.value); }} />
                            <label htmlFor="name">Password</label>
                            <input className="inputs" type="password" placeholder="Password" onChange={(event) => { setPasswd(event.target.value); }} />
                            <button onClick={joinroom}>Join A Room</button>
                        </>}
                </section>
            </>
        }

        </main>
        <Footer />
    </>)
}
export default JoinRoom;