import React from "react";
import Home from "./Home"
import Register from "./register"
import Login from "./Login"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
function App() {
    return (<>
        <UserContext>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

            </Router>
        </UserContext>
    </>)
}
export default App