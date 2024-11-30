'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Coffee, BookOpen, Scale, History, Droplet } from 'lucide-react'

export function HomeClientPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-[#1B4332] mb-6">
            Your Personal Coffee Journey
          </h1>
          <p className="text-xl text-[#1B4332]/80 mb-8 max-w-2xl mx-auto">
            Transform your daily coffee ritual into a crafted experience. Track, learn, and perfect your coffee brewing.
          </p>
          {!session && (
            <Link
              href="/auth/signin"
              className="inline-block bg-[#1B4332] text-white px-8 py-3 rounded-lg hover:bg-[#2D6A4F] transition-colors"
            >
              Start Your Journey
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
