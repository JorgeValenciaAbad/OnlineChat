import { useState } from "react";

export default function Rooms() {

    const [flag, setFlag] = useState(false);

    const insert = async (name, passwd, type, id) => {
        await fetch("http://localhost:3000/api/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, passwd, type, id })
        });
    }

    const check = async (name, passwd) => {
        const response = await fetch("http://localhost:3000/api/loginroom", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, passwd })
        })
        setFlag(response.ok)
    }

    const erase = async (name) => {
        await fetch("http://localhost:3000/api/erase", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name : name })
        })
    }

    return {
        flag: flag,
        insert,
        check,
        erase
    }
}
