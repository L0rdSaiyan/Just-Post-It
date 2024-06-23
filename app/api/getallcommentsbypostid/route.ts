import { NextResponse, NextRequest } from "next/server";
import Posts from "@/app/models/posts";
import Users from "@/app/models/users";
import Comments from "@/app/models/comments";

export async function GET(request : NextRequest) : Promise<void | Response>  {


  try {
    const postId = request.nextUrl.searchParams.get("postId")
    const comments = await Comments.findAll({ where:{ postId: postId }, order : [['createdAt', 'DESC']]});
    return NextResponse.json({comments});
  } catch (error) {
    return NextResponse.json(error);
  }
}
