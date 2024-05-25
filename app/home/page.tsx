"use client";
import { useEffect, useState } from "react";
import { UserType } from "../types/user";

export default function Home() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const userData = window.localStorage.getItem("userLogin");
        if (userData) {
            try {
                console.log(typeof(userData))
                const parsedUser: UserType = JSON.parse(userData);//transformo a resposta que vem em um objeto json válido
                setUser(parsedUser);
                console.log(typeof(JSON.parse(userData))) 
            } catch (e) {
                console.error("Ocorreu um erro ao resgatar os dados do usuário", e);
            }
        }
    }, []);

    return (
        <div>
            <div>
            {user ? (
                <div>
                    <p>Bem vindo, {user.name}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
            </div>
          
        </div>
    );
}
