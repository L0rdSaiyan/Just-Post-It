import { NextRequest, NextResponse} from "next/server";
import Posts from "@/app/models/posts";

export async function GET(request: NextRequest)  : Promise<void | Response>  {
 
    try{
        const mostLikedPosts = await Posts.findAll({
            order: [['likes', 'DESC']]
        })
        return NextResponse.json(mostLikedPosts)
    }catch(error)
    {
        return NextResponse.json(error)
    }

}