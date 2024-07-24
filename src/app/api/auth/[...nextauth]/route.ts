import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers:[
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          credentials: 'include'
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
        ],
        session: {
          strategy: 'jwt',
        },
        callbacks: {
          async jwt({token, user}) {
            if (user) {
              token.accessToken = user.access_token as string;
              const userId = Number(user.id);
              if (!isNaN(userId)) {
                token.userId = user.id;
              } else {
                console.error('Invalid userId:', user.id);
              }
            }
            return token;
          },
          async session({session, token}): Promise<Session> {
            if (token?.accessToken) {
              session.accessToken = token.accessToken;
              session.user = {
                id: token.userId as number,
                username: token.username as string,
                location: token.location as string | null,
              };
            }
            return session;
          }
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
          signIn: '/auth/login',
        }

})

export {handler as GET, handler as POST};