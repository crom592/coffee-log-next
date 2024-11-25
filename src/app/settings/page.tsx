"use client"

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [nickname, setNickname] = useState(session?.user?.name || '')

  return (
    <div className="page-content">
      <h1 className="page-title">설정</h1>
      <div className="card">
        <h2>프로필 설정</h2>
        <div className="form">
          <div className="form-group">
            <label className="form-label">닉네임</label>
            <input
              type="text"
              className="form-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button className="button button-primary">저장</button>
        </div>
      </div>
    </div>
  )
}
