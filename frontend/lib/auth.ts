import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials"
import { use } from 'react';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await fetch("http://localhost:8000/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const data = await response.json();
          if (response.ok && data) {
            return data
          }
          return { id: credentials?.username, token: data.access_token };
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
});
