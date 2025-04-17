// app/api/user/route.ts
import { fetchUserData } from 'app/actions/user';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await fetchUserData();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
