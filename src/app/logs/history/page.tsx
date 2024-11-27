'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee, Plus, Calendar } from 'lucide-react'

interface CoffeeLog {
  id: string
  date: string
  beanName: string
  method: string
  grindSize: string
  dose: string
  yield: string
  time: string
  rating: number
  notes: string
}

const sampleLogs: CoffeeLog[] = [
  {
    id: '1',
    date: '2024-02-20',
    beanName: 'Ethiopia Yirgacheffe',
    method: 'V60',
    grindSize: 'Medium Fine',
    dose: '15g',
    yield: '250ml',
    time: '2:30',
    rating: 4,
    notes: 'Bright and floral with jasmine notes. Could try finer grind next time.'
  },
  {
    id: '2',
    date: '2024-02-19',
    beanName: 'Colombia Huila',
    method: 'Aeropress',
    grindSize: 'Fine',
    dose: '18g',
    yield: '200ml',
    time: '1:30',
    rating: 5,
    notes: 'Perfect balance of chocolate and caramel notes. Keep these parameters.'
  }
]

export default function HistoryPage() {
  const [logs] = useState<CoffeeLog[]>(sampleLogs)

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#1B4332] flex items-center gap-2">
            <Coffee className="w-8 h-8" />
            Brewing History
          </h1>
          <Link
            href="/logs/new"
            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg hover:bg-[#143728] transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </Link>
        </div>

        <div className="space-y-6">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-[#E9E5E0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-serif text-[#1B4332]">{log.beanName}</h3>
                <div className="flex items-center gap-2 text-[#1B4332]/80">
                  <Calendar className="w-4 h-4" />
                  {new Date(log.date).toLocaleDateString()}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2 text-[#1B4332]/80">
                  <p><span className="font-medium">Method:</span> {log.method}</p>
                  <p><span className="font-medium">Grind Size:</span> {log.grindSize}</p>
                </div>
                <div className="space-y-2 text-[#1B4332]/80">
                  <p><span className="font-medium">Dose:</span> {log.dose}</p>
                  <p><span className="font-medium">Yield:</span> {log.yield}</p>
                </div>
                <div className="space-y-2 text-[#1B4332]/80">
                  <p><span className="font-medium">Time:</span> {log.time}</p>
                  <p><span className="font-medium">Rating:</span> <span className="text-yellow-500">{renderStars(log.rating)}</span></p>
                </div>
              </div>
              <p className="text-[#1B4332]/80 mt-4">
                <span className="font-medium">Notes:</span> {log.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
