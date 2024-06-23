import { NextResponse } from "next/server";

export async function GET(req : any, res : any)  : Promise<void | Response>  {
    
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
