'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Coffee, LogOut, User, Bookmark } from 'lucide-react'

export default function Navigation() {
  const { data: session } = useSession()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <nav className="bg-[#E9E5E0] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-[#1B4332] hover:text-[#143728] transition-colors"
            >
              <Coffee className="w-6 h-6 mr-2" />
              <span className="font-serif text-lg">Coffee Log</span>
            </Link>
            
            <div className="hidden sm:flex items-center space-x-6">
              <Link
                href="/logs/beans"
                className="text-[#1B4332] hover:text-[#143728] transition-colors"
              >
                Beans
              </Link>
              <Link
                href="/logs/brewing"
                className="text-[#1B4332] hover:text-[#143728] transition-colors"
              >
                Brewing
              </Link>
              <Link
                href="/logs/history"
                className="text-[#1B4332] hover:text-[#143728] transition-colors"
              >
                History
              </Link>
              <Link
                href="/logs/new"
                className="text-[#1B4332] hover:text-[#143728] transition-colors"
              >
                New Log
              </Link>
              <Link
                href="/logs/bookmarks"
                className="text-[#1B4332] hover:text-[#143728] transition-colors"
              >
                Bookmarks
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <span className="text-[#1B4332] font-medium hidden sm:block">
                    {session.user?.name}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/logs/history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Logs
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg hover:bg-[#143728] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
