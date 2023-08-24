import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "please enter email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Login Functionality

        // Login functionality with API
        const { username, password } = credentials;
        const res = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password,
          }),
        });

        const user = await res.json();

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
    async signIn(user) {
      // Check if the user is authenticated based on your criteria
      const isUserAuthenticated = user.user.id
      if (isUserAuthenticated) {
        return true; // Allow sign-in and continue with the redirect
      } else {
        return false; // Prevent sign-in and no redirect
      }
    }
  },
  pages:{
    signIn: '/auth/login'
  }
};

export default NextAuth(authOptions);
