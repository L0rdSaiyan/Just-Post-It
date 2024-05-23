"use client"
import { useState, useEffect } from "react";
import { handler } from "../axios/axios";

interface User {
    name: string;
    senha: string
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]); // Initialize users as an empty array

    useEffect(()=>
    {
        getUsers()
    },[])

    const getUsers = async () => {
        try {
            const response = await handler.get("/userlist");
            const userData = await response.data.usersList;
            setUsers(userData);
            console.log(typeof(userData))
            console.log(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <>
            <h1>Users</h1>
            <ul>
                {users && users.map(user => (
                    <li key={user.name}>{user.name}</li>
                ))}
            </ul>
        </>
    );
}
