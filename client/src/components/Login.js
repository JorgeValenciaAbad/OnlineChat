import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/footer';
import useUser from '../hooks/useUser'
import { useEffect } from "react";

const Login = () => {
    const { register, handleSubmit} = useForm();
    const { isLogged, login, isLoading, hasLoginError} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogged) navigate("/")
    },[isLogged, navigate])

    const onSubmit = (datos) => {
        console.log(datos);
        login(datos.names,datos.passwd);
    };
    return (<>
        <Header />
        <main>
            {isLoading &&
            <section className="form-register">
              <h1>Checking credentials...</h1> 
            </section>
            }  
            
            {!isLoading &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className="form-register">
                    <h1>Log In </h1>
                    {hasLoginError && <p className="error"> Creadentials are invalid</p>}
                    <label htmlFor="userName">User Name</label>
                    <input className="inputs" type="text" {...register("names")}  id="userName" placeholder="User Name" />
                    <label htmlFor="passwd">Password</label>
                    <input className="inputs" type="password" {...register("passwd")}  id="passwd" placeholder="Password" />
                    <button type="submit">Log In</button>
                </section>
            </form>
            }
        </main>
        <Footer />
    </>);

}
export default Login;
