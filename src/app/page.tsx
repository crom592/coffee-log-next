'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Coffee, BookOpen, Scale, History, Droplet } from 'lucide-react'

export default function Home() {
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
              className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-8 py-4 rounded-lg hover:bg-[#143728] transition-colors text-lg"
            >
              Start Your Journey
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-[#1B4332]" />
            </div>
            <h2 className="text-2xl font-serif text-[#1B4332] mb-3">Detailed Logging</h2>
            <p className="text-[#1B4332]/80">
              Record every aspect of your brew - from bean origin and roast level to water temperature and extraction time.
              Build a comprehensive database of your coffee experiences.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-[#1B4332]" />
            </div>
            <h2 className="text-2xl font-serif text-[#1B4332] mb-3">Perfect Your Ratio</h2>
            <p className="text-[#1B4332]/80">
              Fine-tune your coffee-to-water ratios, grind size, and brewing parameters. 
              Achieve consistency in every cup with precise measurements and timing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-[#1B4332]" />
            </div>
            <h2 className="text-2xl font-serif text-[#1B4332] mb-3">Track Progress</h2>
            <p className="text-[#1B4332]/80">
              Review your brewing history, identify patterns, and refine your technique.
              Learn from past experiences to brew better coffee every day.
            </p>
          </div>
        </div>

        {session && (
          <>
            <h2 className="text-2xl font-serif text-[#1B4332] mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/logs/new"
                className="bg-[#E9E5E0] p-6 rounded-2xl hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-[#1B4332]/20 transition-colors">
                  <Coffee className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h3 className="text-xl font-serif text-[#1B4332] mb-2">New Entry</h3>
                <p className="text-[#1B4332]/80">Log your latest brew</p>
              </Link>
              
              <Link
                href="/logs/beans"
                className="bg-[#E9E5E0] p-6 rounded-2xl hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-[#1B4332]/20 transition-colors">
                  <Droplet className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h3 className="text-xl font-serif text-[#1B4332] mb-2">Coffee Beans</h3>
                <p className="text-[#1B4332]/80">Explore your collection</p>
              </Link>
              
              <Link
                href="/logs/brewing"
                className="bg-[#E9E5E0] p-6 rounded-2xl hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-[#1B4332]/20 transition-colors">
                  <Scale className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h3 className="text-xl font-serif text-[#1B4332] mb-2">Brewing Methods</h3>
                <p className="text-[#1B4332]/80">Perfect your technique</p>
              </Link>
              
              <Link
                href="/logs/history"
                className="bg-[#E9E5E0] p-6 rounded-2xl hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-12 h-12 bg-[#1B4332]/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-[#1B4332]/20 transition-colors">
                  <History className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h3 className="text-xl font-serif text-[#1B4332] mb-2">History</h3>
                <p className="text-[#1B4332]/80">Review past brews</p>
              </Link>
            </div>
          </>
        )}

        <div className="mt-16 text-center">
          <p className="text-lg text-[#1B4332]/60 max-w-2xl mx-auto">
            Join our community of coffee enthusiasts and elevate your brewing experience.
            Whether you're a beginner or a seasoned barista, Coffee Log helps you brew better coffee, one cup at a time.
          </p>
        </div>
      </div>
    </div>
  )
}