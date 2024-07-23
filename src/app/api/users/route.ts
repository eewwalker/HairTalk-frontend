import { NextRequest, NextResponse } from "next/server";
import { createNewUser } from "@/src/lib/api";

export default async function registerUser(request: NextRequest) {
  try{
    const {name, password, location} = await request.json();
    const user = await createNewUser(name, password, location);

    return NextResponse.json(user, {status: 200});
  }catch(error) {
    console.error('Failed to create new user:', error);

    return NextResponse.json({error: 'Failed to create new user'}, {status:500})
  }

}