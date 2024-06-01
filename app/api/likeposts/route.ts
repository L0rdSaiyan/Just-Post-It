import { NextResponse } from "next/server";
import Posts from "@/app/models/posts";
export async function PUT(request : Request) {
    try{
        const {id} = await request.json()
        const post = await Posts.findOne({where : {id:id}})
        const {titulo, conteudo, likes, dislikes} = await Posts.update(
            {likes : post.likes+1},
            {where: {id:id}}
        )
        return NextResponse.json({
            titulo,
            conteudo,
            likes,
            dislikes
        })
    }catch(error)
    {
        console.log(error)
    }
   
}