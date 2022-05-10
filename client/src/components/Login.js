import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/footer';
import md5 from "md5";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const OnSubmit = async (datos) => {
        await fetch("http://localhost:3000/users").json().then(data => {
            const login = datos
            for (const user of data) {
                if (user.names === login.names && user.passwd === md5(login.passwd)) {

                    navigate("/chat", { replace: true })
                }
            }
        })
        navigate("/login", { replace: true });
    };
    return (<>
        <Header />
        <main>
            <div className="normalHeader">
            </div>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <section className="form-register">
                    <h1>Log In</h1>
                    <label htmlFor="userName">User Name</label>
                    <input className="inputs" type="text" {...register("names")} id="userName" placeholder="User Name" />
                    <label htmlFor="passwd">Password</label>
                    <input className="inputs" type="password" {...register("passwd")} id="passwd" placeholder="Password" />
                    <button type="submit">Log In</button>
                </section>
            </form>
        </main>
        <Footer />
    </>);

}
export default Login;
