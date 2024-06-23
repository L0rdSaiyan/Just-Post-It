import { NextResponse } from "next/server";
import Users from "@/app/models/users";
export async function GET()  : Promise<void | Response>  {
  try {
    const usersList = await Users.findAll();
    return NextResponse.json({
      usersList,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
