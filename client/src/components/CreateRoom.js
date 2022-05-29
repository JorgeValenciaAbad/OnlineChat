import React from "react";
import { Footer } from "../Layout/footer";
import { Header } from "../Layout/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Rooms from '../hooks/Rooms'


const CreateRoom = () => {
  const { isLogged } = useUser();
  const { insert } = Rooms();
  const navigate = useNavigate();
  const [nameRoom, setName] = useState("");
  const [passwdRoom, setPasswd] = useState("");
  const [type, setType] = useState("P");
  const [error, setError] = useState(false);
  const createRoom = async () => {
    switch (type) {
      case "P":
        if (nameRoom !== "") {
          insert(nameRoom, passwdRoom, type);
          navigate("/joinroom");
        } else {
          setError(true);
        }
        break;
      case "S":
        if (nameRoom !== "" && passwdRoom !== "") {
          insert(nameRoom, passwdRoom, type);
          navigate("/joinroom");
        } else {
          setError(true);
        }
        break;
    }
  }
  useEffect(() => {
    if (!isLogged) {
      alert("You have to log in to access this part of the page.");
      navigate("/login");

    }
  }, [isLogged, navigate]);
  return (<>
    <Header />
  <main>
    <section className="form-register">
      <h1>Create A Chat</h1>
      {error && <p className="error">Creadentials invalid</p>}
      <label htmlFor="type">Room Types</label>
        <select name="type" onChange={(event) => { setType(event.target.value); }}>
          <option value="P">Public</option>
          <option value="S">Private</option>
        </select>
      {type === "P" ?
        <>
        <label htmlFor="type">Room Name</label>
          <input type="text" placeholder="My Room..." onChange={(event) => { setName(event.target.value); }} />
          <button onClick={createRoom}>Join A Room</button>

        </>
        :
        <>
        <label htmlFor="type">Room Name</label>
          <input type="text" placeholder="My Room..." onChange={(event) => { setName(event.target.value); }} />
        <label htmlFor="type">Room Password</label>
          <input type="password" placeholder="Password" onChange={(event) => { setPasswd(event.target.value); }} />
          <button onClick={createRoom}>Join A Room</button>
        </>}
    </section>
     </main>
    <Footer />
 
  </>);

}
export default CreateRoom;