import React from "react";
import Home from "./Home"
import Register from "./register"
import Login from "./Login"
import Connection from "./Conection";
import DeleteRoom from './DeleteRooms';
import Profile from "./profile"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CreateRoom from "./CreateRoom";
function App() {
    return (<>
        
        <UserContext>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/createroom" element={<CreateRoom />} />
                    <Route path="/deleteroom" element={<DeleteRoom />} />
                    <Route path="/joinroom" element={<Connection />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>

            </Router>
        </UserContext>
    </>)
}
export default App