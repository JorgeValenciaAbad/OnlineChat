import React from "react";
import { Footer } from "../Layout/footer";
import { Header } from "../Layout/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
const Profile = () => {
    const { isLogged, isUpdate, update } = useUser();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    useEffect(() => {
        if (!isLogged) {
            alert("You have to log in to access this part of the page.")
            navigate("/login")
        }
    }, [isLogged, navigate])
    const onSubmit = async (data, event)=>{
        event.preventDefault();
        update(data.names, data.passwd, data.email);
        alert("Cambios realizados con exito")
        navigate("/login")
    }
    return (<>

        <Header />
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <section className="form-register">
                    <h1>Modify User</h1>
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
        </main>
        <Footer />
    </>);

}
export default Profile;