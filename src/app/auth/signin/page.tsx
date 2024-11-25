"use client"

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email/password sign in
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
        
        <h1 className="auth-title">Welcome Back</h1>
        
        <div className="auth-providers">
          <button
            onClick={() => signIn('google', { callbackUrl: '/logs' })}
            className="auth-provider-button google"
          >
            <Image src="/images/google.svg" alt="Google" width={24} height={24} />
            Continue with Google
          </button>
          
          <button
            onClick={() => signIn('kakao', { callbackUrl: '/logs' })}
            className="auth-provider-button kakao"
          >
            <Image src="/images/kakao.svg" alt="Kakao" width={24} height={24} />
            카카오로 계속하기
          </button>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form onSubmit={handleEmailSignIn} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="button button-primary button-large" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
