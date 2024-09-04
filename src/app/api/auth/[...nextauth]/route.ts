
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateUserCredentials } from "@/src/lib/api";
import { User } from '@/types';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await validateUserCredentials(credentials.username, credentials.password);
        if (!user) {
          return null;
        }
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.location = user.location;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username as string;
        session.user.location = token.location as string;
        session.user?.email || null;
        session.user?.name || null;
        session.user?.image || null;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }


