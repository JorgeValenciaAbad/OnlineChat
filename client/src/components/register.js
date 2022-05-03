import React from "react";
//import Header from "./Header"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Header from "./Header";


const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data, event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            console.log(response);
            if (response.status===200) {
                navigate("/login",{ replace: true } )
            }
            navigate("/login",{replace: true});
        } catch (error) {
            console.log(error.message)
        }
    } 
    return <>
    <Header/>
        <div className="normalHeader">
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

            <section className="form-register">
                <h1>Register</h1>
                <label htmlFor="userName">User Name</label>
                <input className="inputs" type="text" {...register('names', {
                    required: true,
                    maxLength: 10,
                    minLength: 3,
                    pattern: /[A-Za-z]{3,10}/
                })} id="userName" placeholder="John" />
                {errors.names?.type === 'required' && <p className="error">El campo nombre es obligatorio</p>}
                {errors.names?.type === 'maxLength' && <p className="error">El campo nombre debe tener menos de 10 caracteres</p>}
                {errors.names?.type === 'minLength' && <p className="error">El campo nombre debe tener más de 3 caracteres</p>}
                {errors.names?.type === 'pattern' && <p className="error">El campo nombre es incorrecto</p>}
                <label htmlFor="email">Email</label>
                <input className="inputs" type="email" {...register('email', {
                    required: true,
                    pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
                })} id="email" placeholder="example@email.es" />
                {errors.email?.type === 'pattern' && <p className="error">El campo email es incorrecto</p>}
                <label htmlFor="passwd">Password</label>
                <input className="inputs" type="password" {...register('passwd', {
                    required: true,
                    pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
                })} id="passwd" placeholder="Password" />
                {errors.passwd?.type === 'pattern' && <p className="error">La contraseña es incorrecta</p>}
                <button type="submit">Send</button>
            </section>
        </form>
    </>;

}
export default Register;