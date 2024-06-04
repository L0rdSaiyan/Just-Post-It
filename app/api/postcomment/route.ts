import { NextRequest, NextResponse } from "next/server";
import Comments from "@/app/models/comments"

export async function POST(request: NextRequest) {

    const {authorName, postId, content} = await request.json()

    try{

        const comment = await Comments.create({
            authorName: authorName,
            postId: postId,
            content: content
        })

        return NextResponse.json({comment})

    }catch(error)
    {
        return NextResponse.json(error)
    }

}
