import { NextResponse, NextRequest } from "next/server";
import Posts from "@/app/models/posts";
export async function DELETE(request:NextRequest) {

    const {postId} = await request.json()

    try{
        const postToDelete = await Posts.findOne({where : {id:postId}})
        const deletedPost = await postToDelete.destroy()
        return NextResponse.json({
            deletedPost
        })
    }catch(error)
    {
        return error
    }
    
}