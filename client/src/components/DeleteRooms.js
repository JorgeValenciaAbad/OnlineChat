import React from "react";
import { Footer } from "../Layout/footer";
import { Header } from "../Layout/Header";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import Rooms from '../hooks/Rooms'
import User from "../hooks/user";
import Table from "../hooks/useTable";
import { useNavigate } from "react-router-dom";

const DeleteRoom = () => {
    const { isLogged } = useUser();
    const { erase } = Rooms();
    const { id, get } = User();
    const navigate = useNavigate();
    const { list, getUserRooms } = Table();
    const [nameRoom, setName] = useState("");
    const [error, setError] = useState(false);
    get()
    if (id !== undefined && id !== null) {
        getUserRooms(id);
    }


    getUserRooms()
    function deleteRoom() {
        if (nameRoom !== "" && nameRoom !== undefined) {
            console.log(nameRoom);
            erase(nameRoom);
            alert("Room deleted");
        } else {
            setError(true);
        }
    }
    useEffect(() => {
        if (!isLogged) {
            alert("You have to log in to access this part of the page.");
            navigate("/login");

        }
    }, [isLogged, navigate]);

    console.log(id);
    return (<>
        <Header />
        <main>
            <section className="form-register">
                <h1>Delete Room</h1>
                {error && <p className="error">Creadentials invalid</p>}
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
                                deleteRoom();
                            }}>Delete</button></td>
                        </tr>)
                    })}
                </table>
            </section>
        </main>
        <Footer />

    </>);

}
export default DeleteRoom;