'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { coffeePresets } from '../../../data/coffeePresets'
import type { CoffeePreset } from '../../../types/coffee'
import "../../../styles/logs.css"

export default function NewLogPage() {
  const router = useRouter()
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    origin: {
      country: '',
      region: '',
      farm: '',
      altitude: '',
    },
    processing: '',
    roastPoint: '',
    beanNotes: '',
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
    isPublic: false,
    allowCollaboration: false,
  })

  const handlePresetSelect = (preset: CoffeePreset) => {
    setSelectedPreset(preset.id)
    setFormData(prev => ({
      ...prev,
      origin: preset.origin,
      processing: preset.processing,
      roastPoint: preset.roastPoint,
      beanNotes: preset.beanNotes,
      waterTemp: preset.defaultBrewingSettings.waterTemp.toString(),
      ratio: preset.defaultBrewingSettings.ratio,
      grindSize: preset.defaultBrewingSettings.grindSize,
      brewTime: preset.defaultBrewingSettings.brewTime,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || 'Failed to create coffee log')
      }

      router.push('/logs')
    } catch (error) {
      console.error('Error creating coffee log:', error)
      setError(error instanceof Error ? error.message : '커피 기록 저장 중 오류가 발생했습니다')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <a href="/logs" className="back-button">
          ← 돌아가기
        </a>
        <h1 className="page-title">새 커피 기록</h1>
      </div>

      <div className="card">
        <section className="mb-8">
          <h2 className="section-title mb-4">원두 프리셋 선택</h2>
          <div className="preset-grid">
            {coffeePresets.map(preset => (
              <div
                key={preset.id}
                className={`preset-card ${selectedPreset === preset.id ? 'selected' : ''}`}
                onClick={() => handlePresetSelect(preset)}
              >
                <h3 className="preset-title">{preset.name}</h3>
                <p className="preset-notes">{preset.beanNotes}</p>
                <div className="preset-details">
                  <p>{preset.origin.country} / {preset.origin.region}</p>
                  <p>{preset.processing} / {preset.roastPoint}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <form className="form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="form-section">
            <h2 className="section-title">원두 정보</h2>
            
            <div className="form-group">
              <label className="form-label">원산지</label>
              <input
                type="text"
                value={formData.origin.country}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  origin: { ...prev.origin, country: e.target.value }
                }))}
                className="form-input"
                placeholder="예: 에티오피아"
              />
            </div>

            <div className="form-group">
              <label className="form-label">지역</label>
              <input
                type="text"
                value={formData.origin.region}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  origin: { ...prev.origin, region: e.target.value }
                }))}
                className="form-input"
                placeholder="예: 예가체프"
              />
            </div>

            <div className="form-group">
              <label className="form-label">농장/협동조합</label>
              <input
                type="text"
                value={formData.origin.farm}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  origin: { ...prev.origin, farm: e.target.value }
                }))}
                className="form-input"
                placeholder="예: 아리차 워시드 스테이션"
              />
            </div>

            <div className="form-group">
              <label className="form-label">고도</label>
              <input
                type="text"
                value={formData.origin.altitude}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  origin: { ...prev.origin, altitude: e.target.value }
                }))}
                className="form-input"
                placeholder="예: 1,900-2,200m"
              />
            </div>

            <div className="form-group">
              <label className="form-label">가공방식</label>
              <input
                type="text"
                value={formData.processing}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  processing: e.target.value
                }))}
                className="form-input"
                placeholder="예: 워시드"
              />
            </div>

            <div className="form-group">
              <label className="form-label">로스팅 포인트</label>
              <input
                type="text"
                value={formData.roastPoint}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  roastPoint: e.target.value
                }))}
                className="form-input"
                placeholder="예: 라이트-미디엄"
              />
            </div>

            <div className="form-group">
              <label className="form-label">원두 노트</label>
              <textarea
                value={formData.beanNotes}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  beanNotes: e.target.value
                }))}
                className="form-input"
                placeholder="예: 자스민, 베르가못, 얼그레이"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">추출 정보</h2>

            <div className="form-group">
              <label className="form-label">물 온도 (°C)</label>
              <input
                type="number"
                value={formData.waterTemp}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  waterTemp: e.target.value
                }))}
                className="form-input"
                placeholder="예: 93"
              />
            </div>

            <div className="form-group">
              <label className="form-label">비율</label>
              <input
                type="text"
                value={formData.ratio}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  ratio: e.target.value
                }))}
                className="form-input"
                placeholder="예: 1:16"
              />
            </div>

            <div className="form-group">
              <label className="form-label">분쇄도</label>
              <input
                type="text"
                value={formData.grindSize}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  grindSize: e.target.value
                }))}
                className="form-input"
                placeholder="예: 중간-고운"
              />
            </div>

            <div className="form-group">
              <label className="form-label">추출 시간</label>
              <input
                type="text"
                value={formData.brewTime}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  brewTime: e.target.value
                }))}
                className="form-input"
                placeholder="예: 2:30"
              />
            </div>

            <div className="form-group">
              <label className="form-label">물 양 (ml)</label>
              <input
                type="number"
                value={formData.waterAmount}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  waterAmount: e.target.value
                }))}
                className="form-input"
                placeholder="예: 300"
              />
            </div>

            <div className="form-group">
              <label className="form-label">도징 (g)</label>
              <input
                type="number"
                value={formData.dose}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  dose: e.target.value
                }))}
                className="form-input"
                placeholder="예: 15"
              />
            </div>

            <div className="form-group">
              <label className="form-label">그라인더 종류</label>
              <input
                type="text"
                value={formData.grinder}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  grinder: e.target.value
                }))}
                className="form-input"
                placeholder="예: 바리스타"
              />
            </div>

            <div className="form-group">
              <label className="form-label">드리퍼</label>
              <input
                type="text"
                value={formData.dripper}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  dripper: e.target.value
                }))}
                className="form-input"
                placeholder="예: 하리오 V60"
              />
            </div>

            <div className="form-group">
              <label className="form-label">필터</label>
              <input
                type="text"
                value={formData.filter}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  filter: e.target.value
                }))}
                className="form-input"
                placeholder="예: 화이트 필터"
              />
            </div>

            <div className="form-group">
              <label className="form-label">레시피</label>
              <textarea
                value={formData.recipe}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  recipe: e.target.value
                }))}
                className="form-input"
                placeholder="예: 1. 40g의 물을 93°C로 가열합니다. 2. 15g의 원두를 분쇄합니다. 3. 원두에 물을 붓고 2:30 동안 추출합니다."
              />
            </div>

            <div className="form-group">
              <label className="form-label">컵 노트</label>
              <textarea
                value={formData.cupNotes}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  cupNotes: e.target.value
                }))}
                className="form-input"
                placeholder="예: 달콤한 향과 고소한 맛이 특징입니다."
              />
            </div>

            <div className="form-group">
              <label className="form-label">개선 사항</label>
              <textarea
                value={formData.improvements}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  improvements: e.target.value
                }))}
                className="form-input"
                placeholder="예: 추출 시간을 2:45로 늘려서 더 강한 맛을 내보았습니다."
              />
            </div>

            <div className="form-group">
              <label className="form-label">TDS (%)</label>
              <input
                type="number"
                value={formData.tds}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  tds: e.target.value
                }))}
                className="form-input"
                placeholder="예: 1.2"
              />
            </div>

            <div className="form-group">
              <label className="form-label">수율 (%)</label>
              <input
                type="number"
                value={formData.extraction}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  extraction: e.target.value
                }))}
                className="form-input"
                placeholder="예: 20"
              />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">공유 설정</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    isPublic: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="ml-2">공개</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.allowCollaboration}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    allowCollaboration: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="ml-2">협업 허용</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
