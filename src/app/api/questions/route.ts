import { NextRequest, NextResponse } from "next/server";
import {createNewQuestion} from '@/src/lib/api';

export async function POST(request: NextRequest) {
  try{
    const {userId, content, createdAt} = await request.json();
    const question = await createNewQuestion(userId, content, createdAt);

    return NextResponse.json(question, {status: 200});
  }catch(error) {
    console.error('Failed to create new question:', error);

    return NextResponse.json({error: 'Failed to create new question'}, {status: 500})
  }
}