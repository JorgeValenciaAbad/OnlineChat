import React from "react";
//import Header from "./Header";
import { useForm } from "react-hook-form";
import md5 from "md5";
import { useNavigate } from "react-router";
import Header from "./Header";


const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const OnSubmit = async(datos) =>{
        const login = datos;
         const response =  await fetch("http://localhost:3000/users");
         await response.json().then(data =>{
             for (const user of data) {
                 if (user.names == login.names && user.passwd == md5(login.passwd)) {
                    navigate("/chat", { replace: true });
                 }
            }
         })
     };
    return <>
    <Header/>
    <div className="normalHeader">
    </div>
    <form onSubmit={handleSubmit(OnSubmit)}>
        <section className="form-register">
            <h1>Log In</h1>
            <label htmlFor="userName">User Name</label>
            <input className="inputs" type="text" {...register("names")} id ="userName" placeholder="User Name"/>
            <label htmlFor="passwd">Password</label>
            <input className="inputs" type="password" {...register("passwd")}id ="passwd" placeholder="Password"/>
            <button type="submit">Log In</button>
        </section>
    </form>
    </>;
    
}
export default Login;
