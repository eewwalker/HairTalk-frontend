import { NextRequest, NextResponse } from "next/server";
import {createNewUser} from '@/lib/api';

export async function POST(request: NextRequest) {
  try{
    const {name, location} = await request.json();
    const user = await createNewUser(name, location);

    return NextResponse.json(user, {status: 200});
  }catch(error) {
    console.error('Failed to create new user:', error);

    return NextResponse.json({error: 'Failed to create new user'}, {status: 500})
  }
}