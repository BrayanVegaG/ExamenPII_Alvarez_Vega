import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    onLogin: (role: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    // Inicializar usuarios predeterminados
    useEffect(() => {
        const defaultUsers = [
            { username: "Publicador", password: "1234", role: "Publicador" },
            { username: "Administrador", password: "1234", role: "Administrador" },
        ];
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        if (existingUsers.length === 0) {
            localStorage.setItem("users", JSON.stringify(defaultUsers));
        }
    }, []);

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
            (u: { username: string; password: string }) => u.username === username && u.password === password
        );

        if (user) {
            localStorage.setItem("loggedUser", JSON.stringify(user));
            onLogin(user.role); // Notificar el rol al componente principal
            navigate("/");
        } else {
            setError("Usuario y/o contraseña incorrectos.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default Login;
