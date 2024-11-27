'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Coffee } from 'lucide-react'

export default function AuthSuccess() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#1B4332]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-10 h-10 text-[#1B4332]" />
          </div>
          
          <h1 className="text-3xl font-serif text-[#1B4332] mb-4">
            Welcome to Coffee Log!
          </h1>
          
          <p className="text-[#1B4332]/80 mb-8">
            Sign in successful. Get ready to start your coffee journey!
          </p>

          <div className="relative">
            <div className="h-1 bg-[#1B4332]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#1B4332] rounded-full w-0 animate-progress"></div>
            </div>
          </div>

          <p className="text-sm text-[#1B4332]/60 mt-4">
            Redirecting you to the home page...
          </p>
        </div>
      </div>
    </div>
  )
}
