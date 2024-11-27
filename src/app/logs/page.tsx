'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Coffee, BookOpen, History } from 'lucide-react'

export default function LogsPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1B4332]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <Link href="/" className="text-[#1B4332] text-3xl font-serif">
            Coffee Log
          </Link>
          <div className="w-8 h-8 bg-[#E9E5E0] rounded-full"></div>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/logs/new">
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <Plus className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">New Entry</span>
            </div>
          </Link>

          <Link href="/logs/beans">
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <Coffee className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">My Beans</span>
            </div>
          </Link>

          <Link href="/logs/brewing">
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <BookOpen className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">Brewing Notes</span>
            </div>
          </Link>

          <Link href="/logs/history">
            <div className="group hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center min-h-[160px] bg-[#E9E5E0] rounded-2xl">
              <History className="h-8 w-8 mb-3 text-[#1B4332] group-hover:scale-110 transition-transform" />
              <span className="text-[#1B4332] font-serif text-lg text-center">History</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
