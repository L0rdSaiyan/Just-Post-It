import { NextResponse } from "next/server";
import Posts from "@/app/models/posts";

export async function GET() : Promise<void | Response>  {
  try {
    const allPosts = await Posts.findAll({
      order: [['createdAt', 'DESC']]
    });
    return NextResponse.json(
      {
        allPosts
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch posts'      },
      { status: 500 }
    );
  }
}
