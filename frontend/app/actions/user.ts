'use server';

import { cookies } from 'next/headers';

export async function fetchUserData() {
  const apiUrl =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:8000';
  const cookieStore = await cookies();

  console.log("cookieStore", cookieStore);
  try {
    // Convert cookies to a proper cookie header string
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    const response = await fetch(`${apiUrl}/api/v1/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cookieHeader
      }
    });

    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    return {
      username: data.username,
      role: data.role
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
