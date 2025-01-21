import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

interface Props {
    onLogout: () => void;
    isLoggedIn: boolean;
    userRole: string;
}

const Navbar: React.FC<Props> = ({ onLogout, isLoggedIn, userRole }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/contact">Contact</Link>

            {!isLoggedIn ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    {userRole === "Publicador" && (
                        <>
                            <Link to="/posts">Posts</Link>
                        </>
                    )}
                    {userRole === "Administrador" && (
                        <>
                            <Link to="/users">Usuarios</Link>
                            
                            <Link to="/posts">Posts</Link>
                        </>
                    )}
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
