import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  const {name, location} = await request.json();
  const user = await createUser(name, location);

  return NextResponse.json(user, {status: 200});
}