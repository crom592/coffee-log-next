"use client"

import { useSession } from 'next-auth/react'

export default function LogsPage() {
  const { data: session } = useSession()

  return (
    <div className="page-content">
      <h1 className="page-title">커피 기록</h1>
      <div className="card">
        <div className="empty-state">
          <h2>아직 커피 기록이 없습니다</h2>
          <p>당신의 커피 여정을 기록해보세요.</p>
          <a href="/logs/new" className="button button-primary">
            첫 커피 기록 작성하기
          </a>
        </div>
      </div>
    </div>
  )
}
