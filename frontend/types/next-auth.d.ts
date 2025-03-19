import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    is_admin: boolean;
  }
  interface User {
    is_admin: boolean;
    token: string;
  }
}
