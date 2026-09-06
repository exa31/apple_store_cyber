import NextAuth, { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const authOptions: NextAuthOptions = {
  providers: [
    // NextAuth Official Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    // Standard Email & Password credentials
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const login = await axios.post(
            `${process.env.API_ENDPOINT_USER}/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const data = login.data;
          if (!data.token) {
            return null;
          } else {
            const expires = new Date();
            expires.setMonth(expires.getMonth() + 1);
            cookies().set("jwt", data.token, {
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              expires,
            });
            return { name: data.name, email: credentials?.email };
          }
        } catch (error) {
          return null;
        }
      },
    }),

    // Google Sign In with Backend verification
    CredentialsProvider({
      id: "google-backend",
      name: "Google via Backend",
      credentials: {
        credential: { label: "Google Token", type: "text" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.credential) return null;

          const res = await fetch(
            `${process.env.API_ENDPOINT_USER}/google-auth`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: credentials.credential }),
            }
          );

          const data = await res.json();
          if (!res.ok || !data.token) {
            return null;
          }

          const expires = new Date();
          expires.setMonth(expires.getMonth() + 1);
          cookies().set("jwt", data.token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires,
          });

          return { name: data.name, email: data.email };
        } catch (error) {
          console.error("NextAuth Google backend authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "credentials" || account?.provider === "google-backend") {
        return true;
      }
      if (account?.provider === "google") {
        try {
          const res = await fetch(`${process.env.API_ENDPOINT_USER}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile?.email || user?.email,
            }),
          });
          const data = await res.json();
          if (!data.token) {
            return "/register";
          }
          const expires = new Date();
          expires.setMonth(expires.getMonth() + 1);
          cookies().set("jwt", data.token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires,
          });
          return true;
        } catch (error) {
          console.error("NextAuth Google sign-in callback error:", error);
          return "/register";
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ baseUrl }): Promise<string> {
      return baseUrl;
    },
  },
  secret: process.env.SECRET || "apple_store",
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/register",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };