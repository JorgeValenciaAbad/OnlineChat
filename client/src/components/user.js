import React from "react";


const Home = async() => {
    const token =  localStorage.getItem('jwt');
    const response = fetch("http://localhost:3000/api/user",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(token)
    }).then
    return <>
        <h1>Habla con mas gente...</h1>
        <p>Conoce gente con tus mismos gustos y habla de la que quieras con la gente.</p>
        <p>Unete a esta comunidad para conocer a gente... </p>
    </>;

}
export default Home;