"use client"
import Link from "next/link";
import { handler } from "../axios/axios";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Dados {
    nome: string;
}

export default function NavBar() {


    const [nome, setNome] = useState<string | undefined>(undefined);
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await handler.get("/");
                const data: Dados = response.data; // Access data directly
                setNome(data.nome);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    return (
        <>
            <ul>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link prefetch={true} href={"/dashboard"}>Dashboard</Link></li>
                <li><Link href={`/dashboard?name=${nome}`}>Dashboard Dinâmico</Link></li>
                <li>
                    <Link replace href={{
                        pathname: "/dashboard",
                        query: { name: "Victor Sales", carrier: "Developer" },
                        
                    }}>
                        Dashboard Brabo
                    </Link>
                </li>

               
                <li>{nome}</li>
            </ul>
            <button onClick={()=> router.push("/dashboard")}>ir</button>
            <button onClick={()=> router.back()}>voltar</button>
            <p>Você está na página: {pathname}</p>
        </>
    );
}
