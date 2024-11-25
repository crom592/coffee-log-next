"use client"

import { useSession } from 'next-auth/react'

export default function CommunityPage() {
  const { data: session } = useSession()

  return (
    <div className="page-content">
      <h1 className="page-title">커뮤니티</h1>
      <div className="card">
        <div className="empty-state">
          <h2>커뮤니티 기능 준비중</h2>
          <p>곧 다른 사람들의 커피 기록을 볼 수 있습니다.</p>
          <a href="/logs" className="button button-primary">
            커피 기록으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}
