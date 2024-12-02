'use client'

import { useSearchParams } from 'next/navigation'
import { Coffee } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-serif text-[#1B4332] mb-4">
            로그인 오류
          </h1>
          <p className="text-[#1B4332]/80 mb-8">
            {error === 'AuthError' 
              ? '인증 과정에서 문제가 발생했습니다.'
              : '로그인 중 오류가 발생했습니다.'}
          </p>
          <Link
            href="/auth/signin"
            className="inline-block bg-[#1B4332] text-white px-6 py-3 rounded-lg hover:bg-[#1B4332]/90 transition-colors"
          >
            다시 시도하기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  )
}
