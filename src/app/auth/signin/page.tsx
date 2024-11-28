'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Coffee } from 'lucide-react'

export default function SignIn() {
  const handleSignIn = async (provider: string) => {
    await signIn(provider, {
      callbackUrl: '/auth/success'
    })
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#1B4332]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-10 h-10 text-[#1B4332]" />
          </div>
          <h1 className="text-3xl font-serif text-[#1B4332] mb-4">
            Welcome Back
          </h1>
          <p className="text-[#1B4332]/80">
            Sign in to continue your coffee journey
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSignIn('google')}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center space-x-3 transition-colors"
          >
            <Image
              src="/images/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleSignIn('kakao')}
            className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#391B1B] font-medium py-3 px-4 rounded-lg border border-[#FEE500] flex items-center justify-center space-x-3 transition-colors"
          >
            <Image
              src="/images/kakao.svg"
              alt="Kakao"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span>Continue with Kakao</span>
          </button>
        </div>

        <p className="text-sm text-[#1B4332]/60 text-center mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
