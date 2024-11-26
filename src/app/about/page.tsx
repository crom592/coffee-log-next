'use client'

import Header from '../../components/Header'
import '../../styles/about.css'

export default function AboutPage() {
  return (
    <div>
      <Header />
      <div className="about-page">
        <div className="about-header">
          <h1 className="about-title">About Coffee Log</h1>
          <p className="about-subtitle">당신의 커피 여정을 기록하세요</p>
        </div>

        <div className="about-content">
          <section className="feature-section">
            <h2>주요 기능</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>상세한 기록</h3>
                <p>원두 정보부터 추출 방법까지 모든 것을 기록할 수 있습니다.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>데이터 분석</h3>
                <p>기록된 데이터를 바탕으로 당신의 커피 취향을 분석해드립니다.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>커뮤니티</h3>
                <p>다른 커피 애호가들과 경험을 공유하고 소통할 수 있습니다.</p>
              </div>
            </div>
          </section>

          <section className="how-to-section">
            <h2>시작하기</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>회원가입</h3>
                <p>간단한 회원가입으로 시작하세요.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>첫 기록 작성</h3>
                <p>마신 커피에 대한 정보를 기록해보세요.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>공유하기</h3>
                <p>나만의 커피 경험을 다른 사람들과 공유하세요.</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>지금 시작하세요</h2>
            <p>당신의 커피 여정이 기다리고 있습니다.</p>
            <a href="/auth/signin" className="cta-button">시작하기</a>
          </section>
        </div>
      </div>
    </div>
  )
}
