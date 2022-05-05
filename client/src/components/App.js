import React from "react";
import Home from "./Home"
import Register from "./register"
import Login from "./Login"
import { Provider } from "react-redux";
import store from "../store";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (<>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

            </Router>
        </Provider>
    </>)
}
export default App