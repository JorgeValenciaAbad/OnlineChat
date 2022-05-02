import React from "react";
import foto from "../images/foto.jpg";

const Cover2= () => {

    return <div className="cover-container2">

        <div className="text">
            <h1>Unete a Nuestra Comunidad...</h1>
            <p>Unete para difrutar de buensa conversaciones con tus amigos o con una persona aleatoria.</p>
        </div>
        <div className="image">
            <img src={foto} alt="Imagen de una persona manejando un ordenador"/>
        </div>
    </div>;
    
}
export default Cover2;