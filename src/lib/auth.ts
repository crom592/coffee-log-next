import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import KakaoProvider from "next-auth/providers/kakao"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

if (!process.env.KAKAO_CLIENT_ID || !process.env.KAKAO_CLIENT_SECRET) {
  throw new Error("Missing Kakao OAuth credentials")
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable")
}

const providers = []

providers.push(
  KakaoProvider({
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    authorization: {
      params: {
        scope: "profile_nickname profile_image"
      }
    }
  })
)

// Add Google provider only if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/auth/error')) {
        return `${baseUrl}/auth/signin?error=AuthError`
      }
      if (url.startsWith('/auth/signin')) {
        return url
      }
      return '/auth/success'
    }
  },
  debug: true, // Enable debug logs
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
  }
}
