import { NextResponse, NextRequest} from "next/server";
import Posts from "@/app/models/posts";
export async function POST(request : NextRequest) {
    
    const {postId} = await request.json()

    try
    {
        const postData = await Posts.findOne({where: {id:postId}})
        return NextResponse.json({postData})
    }catch(error)
    {
        return error
    }

}