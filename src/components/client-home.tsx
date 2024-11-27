'use client'

import { Session } from 'next-auth'
import Link from 'next/link'
import { Coffee, Users, BookOpen, PenLine, LogIn } from 'lucide-react'

interface ClientHomeProps {
  session: Session | null
}

export default function ClientHome({ session }: ClientHomeProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <Link href="/" className="text-[#1B4332] text-3xl font-serif">
            Coffee Log
          </Link>
          {session ? (
            <div className="w-8 h-8 bg-[#E9E5E0] rounded-full"></div>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 text-[#1B4332] hover:text-[#143728] transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span className="font-serif">Sign In</span>
            </Link>
          )}
        </header>

        <div className="text-center mb-12">
          <Coffee className="h-16 w-16 mx-auto mb-6 text-[#1B4332]" />
          <h1 className="text-3xl font-serif text-[#1B4332] mb-4">Welcome to Coffee Log</h1>
          <p className="text-[#1B4332]/80">
            Track and share your coffee experiences with fellow coffee enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href={session ? "/logs/new" : "/auth/signin"}>
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <PenLine className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">New Entry</span>
            </div>
          </Link>

          <Link href={session ? "/logs" : "/auth/signin"}>
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <BookOpen className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">My Logs</span>
            </div>
          </Link>

          <Link href={session ? "/community" : "/auth/signin"}>
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <Users className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">Community</span>
            </div>
          </Link>

          <Link href="/about">
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <Coffee className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">About</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}