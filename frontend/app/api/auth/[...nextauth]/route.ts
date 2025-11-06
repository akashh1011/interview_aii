import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter your email and password');
        }

        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`;
          const { data: user } = await axios.post(apiUrl, {
            email: credentials.email,
            password: credentials.password,
          });

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error(error.response.data.message || 'Invalid credentials');
        }
      },
    }),

  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
            token.name = user.name;
            token.email = user.email;
            token.token = (user as any).token; // If you're passing a custom token
        }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token as string;
        session.user.token = token.backendToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', 
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };