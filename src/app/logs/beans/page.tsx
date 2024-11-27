'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee, Plus } from 'lucide-react'

interface Bean {
  id: string
  name: string
  country: string
  region: string
  farm: string
  altitude: string
  processing: string
  roastPoint: string
  cupNotes: string
}

const sampleBeans: Bean[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    farm: 'Adado Cooperative',
    altitude: '2000m',
    processing: 'Washed',
    roastPoint: 'Medium Light',
    cupNotes: 'Floral, Jasmine, Bergamot'
  },
  {
    id: '2',
    name: 'Colombia Huila',
    country: 'Colombia',
    region: 'Huila',
    farm: 'La Primavera',
    altitude: '1800m',
    processing: 'Washed',
    roastPoint: 'Medium',
    cupNotes: 'Chocolate, Caramel, Orange'
  }
]

export default function BeansPage() {
  const [beans] = useState<Bean[]>(sampleBeans)

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[#1B4332] flex items-center gap-2">
            <Coffee className="w-8 h-8" />
            Coffee Beans
          </h1>
          <Link
            href="/logs/new"
            className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-4 py-2 rounded-lg hover:bg-[#143728] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Bean
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beans.map((bean) => (
            <div
              key={bean.id}
              className="bg-[#E9E5E0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-serif text-[#1B4332] mb-4">{bean.name}</h3>
              <div className="space-y-2 text-[#1B4332]/80">
                <p><span className="font-medium">Origin:</span> {bean.country}, {bean.region}</p>
                <p><span className="font-medium">Farm:</span> {bean.farm}</p>
                <p><span className="font-medium">Altitude:</span> {bean.altitude}</p>
                <p><span className="font-medium">Processing:</span> {bean.processing}</p>
                <p><span className="font-medium">Roast:</span> {bean.roastPoint}</p>
                <p><span className="font-medium">Cup Notes:</span> {bean.cupNotes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
