import React, { useEffect, useState } from "react";

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
        <div>
            <h2>Usuarios Registrados</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.username} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
