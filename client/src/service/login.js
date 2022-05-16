
const URL =  "http://localhost:3000/api/login";

export async function loginService ({names,passwd}){
    const res = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(names, passwd)
    }).then(res=>{
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json()
    }).then(res =>{
        const {token} = res
        return token
    })

  
}