'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Coffee, User } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-serif text-[#1B4332] mb-4">Please Sign In</h1>
          <p className="text-[#1B4332]/80 mb-6">You need to be signed in to view your profile.</p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-lg hover:bg-[#143728] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#E9E5E0] rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-6 mb-8">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={96}
                height={96}
                className="rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-[#1B4332] rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-serif text-[#1B4332] mb-2">{session.user?.name}</h1>
              {session.user?.email && (
                <p className="text-[#1B4332]/80">{session.user.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-serif text-[#1B4332] mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6" />
                Coffee Activity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/logs/history"
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-[#1B4332] mb-1">Brewing History</h3>
                  <p className="text-sm text-[#1B4332]/80">View your coffee brewing logs</p>
                </Link>
                <Link
                  href="/logs/beans"
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-[#1B4332] mb-1">Coffee Beans</h3>
                  <p className="text-sm text-[#1B4332]/80">Browse your coffee collection</p>
                </Link>
                <Link
                  href="/logs/brewing"
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-[#1B4332] mb-1">Brewing Methods</h3>
                  <p className="text-sm text-[#1B4332]/80">Your brewing recipes</p>
                </Link>
                <Link
                  href="/logs/new"
                  className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-[#1B4332] mb-1">New Entry</h3>
                  <p className="text-sm text-[#1B4332]/80">Log a new coffee brewing session</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
