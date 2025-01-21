import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    password: string;
    role: string; // 'Publicador' por defecto
}

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleRegister = () => {
        if (!username || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        // Leer usuarios existentes desde LocalStorage
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Verificar si el nombre de usuario ya existe
        const userExists = existingUsers.some((user: User) => user.username === username);
        if (userExists) {
            setError("El nombre de usuario ya está registrado.");
            return;
        }

        // Crear el nuevo usuario con el rol predeterminado 'Publicador'
        const newUser: User = {
            username,
            password,
            role: "Publicador",
        };

        // Guardar el nuevo usuario en LocalStorage
        localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

        // Redirigir al login
        navigate("/login");
    };

    return (
        <div>
            <h2>Registro</h2>
            <input
                type="text"
                value={username}
                placeholder="Nombre de usuario"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                value={password}
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleRegister}>Registrarse</button>
        </div>
    );
};

export default Register;
