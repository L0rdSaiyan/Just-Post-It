import { NextResponse, NextRequest } from "next/server";
import Posts from "@/app/models/posts";
export async function GET(request: NextRequest) : Promise<void | Response>  {
  const postId = request.nextUrl.searchParams.get("postId");
  try {
    const postData = await Posts.findOne({ where: { id: postId } });

    return NextResponse.json({ postData });
  } catch (error) {
    return NextResponse.json(console.log(error));
  }
}
