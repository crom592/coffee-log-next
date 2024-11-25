"use client"

import { useState } from 'react'

export default function NewLogPage() {
  const [formData, setFormData] = useState({
    // 원두 정보
    origin: {
      country: '',
      region: '',
      farm: '',
      altitude: '',
    },
    processing: '',
    roastPoint: '',
    beanNotes: '',

    // 추출 정보
    waterType: '',
    dose: '',
    waterAmount: '',
    ratio: '',
    grinder: '',
    grindSize: '',
    waterTemp: '',
    dripper: '',
    filter: '',
    recipe: '',
    brewTime: '',
    tds: '',
    extraction: '',
    cupNotes: '',
    improvements: '',

    // 공유 설정
    isPublic: false,
    allowCollaboration: false,
  })

  const processingOptions = [
    { label: '워시드', value: 'washed' },
    { label: '내추럴', value: 'natural' },
    { label: '허니', value: 'honey' },
    { label: '기타', value: 'other' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log(formData)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <a href="/logs" className="button button-secondary">
          돌아가기
        </a>
        <h1 className="page-title">새 커피 기록</h1>
      </div>

      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">원두 정보</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">나라명</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.origin.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    origin: { ...formData.origin, country: e.target.value }
                  })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">지역명</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.origin.region}
                  onChange={(e) => setFormData({
                    ...formData,
                    origin: { ...formData.origin, region: e.target.value }
                  })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">농장</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.origin.farm}
                  onChange={(e) => setFormData({
                    ...formData,
                    origin: { ...formData.origin, farm: e.target.value }
                  })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">고도 (MASL)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.origin.altitude}
                  onChange={(e) => setFormData({
                    ...formData,
                    origin: { ...formData.origin, altitude: e.target.value }
                  })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">프로세싱</label>
                <select
                  className="form-input"
                  value={formData.processing}
                  onChange={(e) => setFormData({ ...formData, processing: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  {processingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">로스팅 포인트</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.roastPoint}
                  onChange={(e) => setFormData({ ...formData, roastPoint: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">컵 노트</label>
              <textarea
                className="form-input form-textarea"
                value={formData.beanNotes}
                onChange={(e) => setFormData({ ...formData, beanNotes: e.target.value })}
                rows={2}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">추출 정보</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">물 종류</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.waterType}
                  onChange={(e) => setFormData({ ...formData, waterType: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">도징 (g)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.dose}
                  onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">물 양 (ml)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.waterAmount}
                  onChange={(e) => setFormData({ ...formData, waterAmount: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">추출 비율</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.ratio}
                  onChange={(e) => setFormData({ ...formData, ratio: e.target.value })}
                  autoComplete="off"
                  placeholder="예: 1:15"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">그라인더 종류</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.grinder}
                  onChange={(e) => setFormData({ ...formData, grinder: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">분쇄도</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.grindSize}
                  onChange={(e) => setFormData({ ...formData, grindSize: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">물 온도 (°C)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.waterTemp}
                  onChange={(e) => setFormData({ ...formData, waterTemp: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">드리퍼</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.dripper}
                  onChange={(e) => setFormData({ ...formData, dripper: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">필터</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.filter}
                  onChange={(e) => setFormData({ ...formData, filter: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">추출 시간</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.brewTime}
                  onChange={(e) => setFormData({ ...formData, brewTime: e.target.value })}
                  autoComplete="off"
                  placeholder="예: 2:30"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">TDS (%)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.tds}
                  onChange={(e) => setFormData({ ...formData, tds: e.target.value })}
                  autoComplete="off"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label className="form-label">수율 (%)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.extraction}
                  onChange={(e) => setFormData({ ...formData, extraction: e.target.value })}
                  autoComplete="off"
                  step="0.1"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">레시피</label>
              <textarea
                className="form-input form-textarea"
                value={formData.recipe}
                onChange={(e) => setFormData({ ...formData, recipe: e.target.value })}
                rows={4}
                autoComplete="off"
                placeholder="푸어링 패턴과 시간을 기록해주세요"
              />
            </div>

            <div className="form-group">
              <label className="form-label">컵 노트</label>
              <textarea
                className="form-input form-textarea"
                value={formData.cupNotes}
                onChange={(e) => setFormData({ ...formData, cupNotes: e.target.value })}
                rows={2}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label className="form-label">개선 사항</label>
              <textarea
                className="form-input form-textarea"
                value={formData.improvements}
                onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                rows={2}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">공유 설정</h2>
            
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <span>공개 프로필로 설정</span>
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.allowCollaboration}
                    onChange={(e) => setFormData({ ...formData, allowCollaboration: e.target.checked })}
                  />
                  <span>다른 사용자의 코멘트 허용</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="button button-primary">
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
