
import jwt from 'jsonwebtoken'
const URL =  "http://localhost:3000/api/login";

export async function loginService ({names,passwd}){
    const res = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(names, passwd)
    });
    if (res.ok) {
        const token = jwt.sign(names, process.env.SECRET);
        return token;
    } else {
        throw new Error('Response is NOT ok');
    }
}