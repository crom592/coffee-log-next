'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Coffee, ChevronLeft, Mail } from 'lucide-react'
import Image from 'next/image'

function SignInContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/logs'

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email/password sign in
  }

  const handleSocialSignIn = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl,
        redirect: true,
      })
      
      if (result?.error) {
        switch (result.error) {
          case "AccessDenied":
            console.error("Access denied by provider")
            break
          case "EmailSignin":
            console.error("Email signin error")
            break
          default:
            console.error("Authentication error:", result.error)
        }
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex items-center mb-8">
          <Link href="/">
            <button className="mr-4 p-2 hover:bg-[#E9E5E0] rounded-lg transition-colors">
              <ChevronLeft className="h-6 w-6 text-[#1B4332]" />
            </button>
          </Link>
          <h1 className="text-[#1B4332] text-2xl font-serif">Sign In</h1>
        </header>

        <div className="space-y-6">
          <div className="text-center">
            <Coffee className="h-16 w-16 mx-auto mb-6 text-[#1B4332]" />
            <h2 className="text-xl font-serif text-[#1B4332] mb-2">Welcome Back!</h2>
            <p className="text-[#1B4332]/80">Sign in to continue your coffee journey</p>
          </div>

          <div className="bg-[#E9E5E0] rounded-2xl p-6 space-y-6">
            <div className="space-y-3">
              <button
                onClick={() => handleSocialSignIn('google')}
                className="w-full py-3 px-6 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-300"
              >
                <Image src="/images/google.svg" alt="Google" width={20} height={20} />
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialSignIn('kakao')}
                className="w-full py-3 px-6 bg-[#FEE500] text-[#3C1E1E] font-medium rounded-lg hover:bg-[#FDD800] transition-colors flex items-center justify-center gap-2"
              >
                <Image src="/images/kakao.svg" alt="Kakao" width={20} height={20} />
                카카오로 계속하기
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1B4332]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#E9E5E0] text-[#1B4332]/60">or</span>
              </div>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="block text-[#1B4332] font-serif mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#1B4332]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-[#1B4332] font-serif mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#1B4332]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#1B4332] text-white font-serif rounded-lg hover:bg-[#143728] transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                Sign in with Email
              </button>
            </form>
          </div>

          <p className="text-center text-[#1B4332]/60">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-[#1B4332] font-serif hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  )
}
