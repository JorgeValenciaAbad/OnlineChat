import React from "react";
import video from "../assets/video/video.mp4";
import useUser from "../hooks/useUser";
import { Header } from '../Layout/Header';

const Home = () => {
    const {isLogged} = useUser()
    return <>
    <Header/>
    <div className="cover-container">
        <video className="video" autoPlay loop muted>
            <source src={video} />
        </video>
        
        <div className="info" id="info">
             {isLogged ?<></> :
            <><h1>Habla con mas gente...</h1>
            <p>Conoce gente con tus mismos gustos y habla de la que quieras con la gente.</p>
            <p>Unete a esta comunidad para conocer a gente... </p></>}
        </div>
    </div>

    </>;
    
}
export default Home;