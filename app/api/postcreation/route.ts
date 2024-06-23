import { NextResponse } from "next/server";
import Posts from "../../models/posts"
import Users from "@/app/models/users";

export async function POST(request: Request)  : Promise<void | Response>  {
    const { title, content, user } = await request.json();
    const author = await Users.findOne({ where: { name: user } });

    if (author) {
        const createdPost = await Posts.create({
            titulo: title,
            conteudo: content,
            authorName: author.name  
        });
        return NextResponse.json({
            createdPost
        });
    } else {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
}