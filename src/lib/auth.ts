import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import KakaoProvider from "next-auth/providers/kakao"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { logWithTimestamp } from '@/utils/logger';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: "profile_nickname profile_image"
        }
      }
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      logWithTimestamp(`JWT Callback - Token: ${JSON.stringify(token)}, User: ${JSON.stringify(user)}, Account: ${JSON.stringify(account)}`);
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.id = user.id
      } else if (!token.id) {
        // Attempt to retrieve user ID from the token's subject
        token.id = token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      logWithTimestamp(`Session Callback - Session: ${JSON.stringify(session)}, Token: ${JSON.stringify(token)}`);
      if (token) {
        session.user.id = token.id as string
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/auth/error')) {
        return `${baseUrl}/auth/signin?error=AuthError`
      }
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface JWT {
    accessToken?: string
    sub?: string
    id?: string
  }
}
