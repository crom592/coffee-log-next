"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="landing-page">
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <Link href="/" className="logo">
            Coffee Log
          </Link>
          <nav className="nav-menu">
            <Link href="/about" className="nav-link">About</Link>
            <Link href={session ? "/logs" : "/auth/signin"} className="nav-link">My Logs</Link>
            <Link href={session ? "/community" : "/auth/signin"} className="nav-link">Community</Link>
          </nav>
        </div>
      </header>

      <div className="hero-section">
        <div className="hero-background">
          <Image
            src="/images/hero-coffee.jpg"
            alt="Premium Coffee"
            fill
            priority
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            The Art of Coffee<br />
            Perfected
          </h1>
          <p className="hero-description">
            당신만의 커피 여정을 기록하고, 더 나은 맛을 향한 발걸음을 시작하세요.
            프리미엄 커피 로깅 플랫폼에서 여러분의 커피 경험이 예술이 됩니다.
          </p>
          <Link href={session ? "/logs/new" : "/auth/signin"} className="button button-primary button-large">
            Start Your Journey
          </Link>
        </div>
      </div>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Elevate Your Coffee Experience</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">☕️</div>
              <h3>Precision Logging</h3>
              <p>원두 정보부터 추출 데이터까지, 당신만의 완벽한 커피를 찾아가는 여정을 기록하세요.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>정교한 데이터 분석으로 당신의 커피 프로파일을 이해하고 더 나은 맛을 찾아보세요.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Curated Community</h3>
              <p>전문가들과 함께하는 프리미엄 커피 커뮤니티에서 새로운 인사이트를 발견하세요.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="community-section">
        <div className="container">
          <div className="community-content">
            <h2>Join the Elite Coffee Community</h2>
            <p>
              전문 바리스타부터 커피 애호가까지, 품격 있는 커피 문화를 함께 만들어갑니다.
              여러분의 특별한 커피 이야기를 공유해보세요.
            </p>
            <Link href={session ? "/community" : "/auth/signin"} className="button button-secondary">
              Explore Community
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Your Premium Coffee Journal</h2>
            <p>지금 시작하세요. 당신만의 특별한 커피 여정이 여기서 시작됩니다.</p>
            <Link href={session ? "/logs/new" : "/auth/signin"} className="button button-primary button-large">
              Begin Your Experience
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
