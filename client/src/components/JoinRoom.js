import React from "react";
import { Footer } from "../Layout/footer";
import { Header } from "../Layout/Header";
import { useState } from "react";
import Chat from './Chat'
import User from '../hooks/user'
import Table from "../hooks/useTable";
import Rooms from "../hooks/Rooms";

const JoinRoom = (socket) => {
    const { names, get } = User();
    const { check, flag } = Rooms()
    const { list, getRooms } = Table();
    const [nameRoom, setName] = useState();
    const [passwdRoom, setPasswd] = useState();
    const [type, setType] = useState("P");
    const [showChat, setValue] = useState(false);
    const [error, setError] = useState(false);
    get();
    getRooms();
    const joinroom = async () => {

        switch (type) {
            case "P":
                if (nameRoom !== "" && nameRoom !== undefined) {

                    console.log(nameRoom);
                    console.log(socket.socket);

                    socket.socket.emit("join_room", nameRoom);
                    setValue(true);
                } else {
                    setError(true);
                }
                break;
            case "S":
                check(nameRoom, passwdRoom);
                if (flag) {
                    socket.socket.emit("join_room", nameRoom);
                    setValue(true);
                } else {
                    setError(true);
                }
                break;
        }
    }
    return (<>
        <Header />
        {showChat ? <main><Chat socket={socket.socket} username={names} nameRoom={nameRoom} /></main>
            : <>
                <main>
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
                                <table>
                                    <tr>
                                        <th>Room Name</th>
                                        <th>Action</th>
                                    </tr>
                                    {list.map((room) => {
                                        return (<tr>
                                            <td>{room.name}</td>
                                            <td><button onClick={() => {
                                                setName(room.name);
                                                joinroom();
                                            }}>Join</button></td>
                                        </tr>)
                                    })}
                                </table>
                            </>
                            :
                            <>
                                <label htmlFor="name">Name Room</label>
                                <input className="inputs" type="text" placeholder="My Room..." id="" onChange={(event) => { setName(event.target.value); }} />
                                <label htmlFor="name">Password</label>
                                <input className="inputs" type="password" placeholder="Password" onChange={(event) => { setPasswd(event.target.value); }} />
                                <button onClick={joinroom}>Join</button>
                            </>}
                    </section>

                </main>
                <Footer />
            </>
        }

        x
    </>)
}
export default JoinRoom;