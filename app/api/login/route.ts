import { NextResponse, NextRequest } from "next/server";
import Users from "@/app/models/users";

//No caso de informações sensíveis como usuário e senha, nós enviamos como um POST
//Pois através do post, você não coloca tais informações direto na url

export async function POST(request: NextRequest) {
    try {
        const { name, senha } = await request.json();
        const userData = await Users.findOne({ where: { name: name, senha: senha }});
        if (userData) {
            return NextResponse.json(userData);
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}






// export async function GET(req: Request) {
//     try {
//         // Extract query parameters
//         const { searchParams } = new URL(req.url);
//         const name = searchParams.get('name');

//         if (!name) {
//             return NextResponse.json({ error: "Name parameter is required" }, { status: 400 });
//         }

//         console.log("Requested name: " + name);
        
//         const userData = await Users.findOne({
//             where: {
//                 name: name
//             }
//         });

//         if (!userData) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json({ userData });
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return NextResponse.json({ error: `Server error: ${error}` }, { status: 500 });
//     }
// }
