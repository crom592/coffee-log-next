'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee, Plus } from 'lucide-react'

interface BrewingMethod {
  id: string
  name: string
  type: string
  grinder: string
  grindSize: string
  waterTemp: string
  ratio: string
  time: string
  description: string
}

const sampleMethods: BrewingMethod[] = [
  {
    id: '1',
    name: 'Classic V60',
    type: 'Pour Over',
    grinder: 'Comandante C40',
    grindSize: 'Medium Fine (22 clicks)',
    waterTemp: '92°C',
    ratio: '1:16',
    time: '2:30',
    description: 'Classic Hario V60 method with 30s bloom, followed by two main pours in concentric circles.'
  },
  {
    id: '2',
    name: 'Aeropress Standard',
    type: 'Immersion',
    grinder: 'Timemore C2',
    grindSize: 'Fine (15 clicks)',
    waterTemp: '85°C',
    ratio: '1:13',
    time: '1:30',
    description: 'Standard method using inverted Aeropress. Stir at 1:00, flip at 1:20, press for 30s.'
  }
]

export default function BrewingPage() {
  const [methods] = useState<BrewingMethod[]>(sampleMethods)

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#1B4332] flex items-center gap-2">
            <Coffee className="w-8 h-8" />
            Brewing Methods
          </h1>
          <Link
            href="/logs/new"
            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg hover:bg-[#143728] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Method
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className="bg-[#E9E5E0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-serif text-[#1B4332] mb-4">{method.name}</h3>
              <div className="space-y-2 text-[#1B4332]/80">
                <p><span className="font-medium">Type:</span> {method.type}</p>
                <p><span className="font-medium">Grinder:</span> {method.grinder}</p>
                <p><span className="font-medium">Grind Size:</span> {method.grindSize}</p>
                <p><span className="font-medium">Water Temperature:</span> {method.waterTemp}</p>
                <p><span className="font-medium">Ratio:</span> {method.ratio}</p>
                <p><span className="font-medium">Time:</span> {method.time}</p>
                <p className="mt-4"><span className="font-medium">Method:</span> {method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
