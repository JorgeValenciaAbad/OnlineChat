
import { useState } from "react";


export default function User() {
    const [id, setId] = useState();
    const [name, setNames] = useState();
    const [email, setEmail] = useState();
    const to = sessionStorage.getItem('jwt');
    const get = async () =>{
    const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token: to})
    }).then(res => {
       return res.json();
    }).then(data => {
        setId(data.id);
        setNames(data.names);
        setEmail(data.email);
    })}
     return {
        id: id,
        names: name,
        email: email,
        get
    }
}


