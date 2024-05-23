import { NextResponse } from "next/server";

export async function GET(req : any, res : any) {
    
    if(req.method === "GET")
    {
        return NextResponse.json({
            users:[
                {nome: "Victor"},
                {nome: "Diana"}
            ]
        })
    }

}
