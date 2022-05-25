
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

 const PrivateRoute = ()=> {
    const { isLogged } = useUser();
    const navigate= useNavigate();
    useEffect(() => {
        if (isLogged) navigate("/")
    },[isLogged, navigate])
}
export default PrivateRoute