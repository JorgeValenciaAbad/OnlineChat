

import { useContext, useCallback, useState } from 'react'
import Context from '../context/UserContext'

export default function useUser() {
    const { jwt, setJWT } = useContext(Context);
    const [state, setState] = useState({ loading: false, error: false });

    const login = async (names, passwd) => {
        if (names != "" && passwd != "") {
            setState({ loading: true, error: false })
            const res = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ names, passwd })
            }).then(res => {
                if (!res.ok) {
                    setState({ loading: false, error: true })
                    window.sessionStorage.removeItem("jwt")
                    throw new Error('Response is NOT ok')
                }
                return res.json()

            }).then(res => {
                setState({ loading: false, error: false })
                setJWT(res);
                window.sessionStorage.setItem("jwt",res);
            }).catch(err =>{
                window.sessionStorage.removeItem("jwt")
                setState({ loading: false, error: true });
                console.log(err)
            })
        }
        setState({ loading: false, error: true })
    }
    const update = async (names, passwd, email) =>{
        const token = jwt;
        if (names != "" && passwd != "" && email) {
            setState({ loading: true, error: false })
            const res = await fetch("http://localhost:3000/api/update", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ names, email, passwd, token})
            }).then(res => {
                if (!res.ok) {
                    window.sessionStorage.removeItem('jwt');
                    setState({ loading: false, error: true });
                    throw new Error('Response is NOT ok');
                }
                return res.json()

            }).then(res => {
                setState({ loading: false, error: false })
                setJWT(res);
                window.sessionStorage.setItem("jwt", res)
                
            }).catch(err =>{
                setState({ loading: false, error: true });
                window.sessionStorage.removeItem('jwt');
                console.log(err)
            })
        }
        setState({ loading: false, error: true })
    }
    const logout = useCallback(() => {

        setJWT(null)
        window.sessionStorage.removeItem('jwt');

    }, [setJWT]);

    return {

        isLogged: Boolean(jwt),
        hasLoginError: state.error,
        isLoading: state.loading,
        login,
        logout,
        update

    }
}