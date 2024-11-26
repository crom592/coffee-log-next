"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import "../../styles/logs.css"

export default function LogsPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    },
  })

  if (status === "loading") {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">커피 기록</h1>
        <a href="/logs/new" className="button button-primary">
          새 기록 작성
        </a>
      </div>
      
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">☕</div>
          <h2 className="empty-state-title">아직 커피 기록이 없습니다</h2>
          <p className="empty-state-description">당신의 커피 여정을 기록해보세요.</p>
          <a href="/logs/new" className="button button-primary button-large">
            첫 커피 기록 작성하기
          </a>
        </div>
      </div>
    </div>
  )
}
