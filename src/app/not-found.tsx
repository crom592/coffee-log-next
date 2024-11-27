'use client'

import Link from 'next/link'
import { Coffee, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="container max-w-md mx-auto p-4">
        <div className="bg-[#E9E5E0] rounded-2xl p-8 text-center">
          <Coffee className="h-16 w-16 mx-auto mb-6 text-[#1B4332]" />
          <h1 className="text-6xl font-serif text-[#1B4332] mb-4">404</h1>
          <h2 className="text-2xl font-serif text-[#1B4332] mb-4">Page Not Found</h2>
          <p className="text-[#1B4332]/80 mb-8">The page you're looking for might have been moved or doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white font-serif rounded-lg hover:bg-[#143728] transition-colors"
          >
            <Home className="h-5 w-5" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
