import React from "react";
import Header from "./Header";
import { useForm } from "react-hook-form";

// import {useForm} from "react-hook-form";


const Login = () => {
    const { register, handleSubmit } = useForm();
    const OnSubmit = async(datos) =>{
         const response =  await fetch("http://localhost:3000/users");
         await response.json().then(data =>{
             for (const user of data) {
                 if (user.names == datos.names && user.passwd == datos.passwd ) {
                    console.log("Has Iniciado Sesión");
                 }
                 console.log("error");
             }
         })
     };
    return <>
    <div className="normalHeader">
        <Header />
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
