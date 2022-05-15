import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/footer';
import { useState } from "react";
import useUser from '../hooks/useUser'
import { useEffect } from "react";

const Login = () => {
    const { register } = useForm();
    const [names, setUsername] = useState();
    const [passwd, setPassword] = useState();
    const { isLogged,login} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogged) navigate("/")
    },[isLogged, navigate])
    const handleSubmit = (e) => {
        e.preventDefault();
        login();

        //navigate ("/")
    };
    return (<>
        <Header />
        <main>
            <div className="normalHeader">
            </div>
            <form onSubmit={handleSubmit}>
                <section className="form-register">
                    <h1>Log In</h1>
                    <label htmlFor="userName">User Name</label>
                    <input className="inputs" type="text" {...register("names")} onChange={(e) => setUsername(e.target.value)} value={names} id="userName" placeholder="User Name" />
                    <label htmlFor="passwd">Password</label>
                    <input className="inputs" type="password" {...register("passwd")} onChange={(e) => setPassword(e.target.value)} value={passwd} id="passwd" placeholder="Password" />
                    <button type="submit">Log In</button>
                </section>
            </form>
        </main>
        <Footer />
    </>);

}
export default Login;
