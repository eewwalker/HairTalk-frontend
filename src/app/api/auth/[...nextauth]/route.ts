import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { logInUser } from "@/src/lib/api";
import { User, CustomSession } from "@/types"; 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const user = await logInUser(credentials.username, credentials.password);

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token as string;
        const userId = Number(user.id);
        if (!isNaN(userId)) {
          token.userId = user.id;
        } else {
          console.error("Invalid userId:", user.id);
        }
        token.username = user.username;
        token.location = user.location;
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        session.user = {
          id: token.userId as number,
          username: token.username as string,
          location: token.location as string | null,
          email: session.user?.email || null,
          name: session.user?.name || null,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
