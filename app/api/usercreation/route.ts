import { NextResponse } from 'next/server';
const User = require('../../models/users'); 

export async function POST(request : Request)  : Promise<void | Response>  {
  try {
    const { nome, senha } = await request.json();

    const createdUser = await User.create({ name: nome, senha: senha });

    return NextResponse.json({
      response: `User created: ${createdUser.name}`,
    });
  } catch (error) {
    return NextResponse.json({
      response: `deu um erro ${error}`,
    });
  }
}
