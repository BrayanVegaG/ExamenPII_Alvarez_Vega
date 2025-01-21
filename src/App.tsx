import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componentes/NavBar";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import Inicio from "./componentes/Home";
import Contact from "./componentes/Contact";
import "./App.css";
import Users from "./componentes/Users";
import PostsConComentarios from "./componentes/PostconComentarios";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>(""); // 'Publicador' o 'Administrador'

    const handleLogin = (role: string) => {
        setIsLoggedIn(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole("");
        localStorage.removeItem("loggedUser");
    };

    return (
        <Router>
            <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} userRole={userRole} />
            <Routes>
                <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
                <Route path="/" element={<Inicio />} />
                <Route path="/contact" element={<Contact />} />
                {isLoggedIn && userRole === "Publicador" && (
                    <>
                        <Route path="/posts" element={<PostsConComentarios />} />

                    </>
                )}
                {isLoggedIn && userRole === "Administrador" && (
                    <>
                        <Route path="/users" element={<Users />} />
                        <Route path="/posts" element={<PostsConComentarios/>} />

                    </>
                )}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
