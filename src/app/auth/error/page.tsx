'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  let errorMessage = '인증 중 문제가 발생했습니다.'
  if (error === 'Configuration') {
    errorMessage = '서버 설정에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
  } else if (error === 'AccessDenied') {
    errorMessage = '접근이 거부되었습니다.'
  } else if (error === 'Verification') {
    errorMessage = '이메일 인증에 실패했습니다.'
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <Image
          src="/images/coffee-beans-dark.jpg"
          alt="Coffee Beans"
          fill
          priority
          quality={100}
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="auth-container">
        <Link href="/" className="auth-logo">
          Coffee Log
        </Link>
        
        <div className="auth-error">
          <h1>로그인 오류</h1>
          <p>{errorMessage}</p>
          <Link href="/auth/signin" className="button button-primary">
            다시 시도하기
          </Link>
        </div>
      </div>
    </div>
  )
}
