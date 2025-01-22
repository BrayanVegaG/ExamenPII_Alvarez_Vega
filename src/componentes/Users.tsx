import React, { useEffect, useState } from "react";
import "./Users.css";

interface User {
    username: string;
    role: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(storedUsers);
    }, []);

    return (
        <div className="container">
            <h2>Usuarios Registrados</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <span>{user.username}</span>
                        <span className={`role-${user.role.toLowerCase()}`}>{user.role}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default Users;
