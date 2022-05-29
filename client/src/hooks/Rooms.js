import { useState } from "react";

export default function Rooms() {
    const [flag, setFlag] = useState(false);
    const insert = async (name, passwd, type) => {
        await fetch("http://localhost:3000/api/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, passwd, type })
        });
    }
    const check = async (name, passwd) => {
        const response = await fetch("http://localhost:3000/api/loginroom", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, passwd})
        })
        setFlag(response.ok)
    }
    return {
        flag: flag,
        insert,
        check
    }
}
