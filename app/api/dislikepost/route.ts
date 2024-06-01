import { NextResponse, NextRequest } from "next/server";
import Posts from "@/app/models/posts";

export async function PUT(request: NextRequest) {

    try{
        const {postId} = await request.json()
        const post = await Posts.findOne({where: {id:postId}})
        const updatedPost = await Posts.update(
            {dislikes : post.dislikes+1},
            {where : {id:post.id}}
        )
        return NextResponse.json({updatedPost})
    }catch(error)
    {
        return error
    }
    
}