import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    is_admin: boolean;
  }
  interface User {
    is_admin: boolean;
    token: string;
  }
}
