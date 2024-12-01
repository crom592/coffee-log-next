"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { logWithTimestamp, errorWithTimestamp } from '@/utils/logger';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement sign up logic
    console.log(formData)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link href="/" className="auth-logo">
          Coffee Log
        </Link>
        
        <h1 className="auth-title">회원가입</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호 확인</label>
            <input
              type="password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="button button-primary button-full">
            회원가입
          </button>
        </form>

        <div className="auth-divider">
          <span>또는</span>
        </div>

        <div className="auth-providers">
          <button className="auth-provider-button google">
            <Image
              src="/images/google.svg"
              alt="Google Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            Google로 계속하기
          </button>
          
          <button className="auth-provider-button kakao">
            <Image
              src="/images/kakao.svg"
              alt="Kakao Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            카카오로 계속하기
          </button>
        </div>

        <p className="auth-footer">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/signin" className="auth-link">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
