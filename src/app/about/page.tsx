import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import { PenLine, BarChart3, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Coffee Log',
  description: 'Learn more about Coffee Log and its features',
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[#1B4332] text-3xl font-serif mb-8">About Coffee Log</h1>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <PenLine className="h-6 w-6 text-[#1B4332] mr-3" />
              <h2 className="text-xl font-serif text-[#1B4332]">Track Your Coffee Journey</h2>
            </div>
            <p className="text-gray-600">Record your coffee experiences, from beans to brewing methods. Keep detailed notes about your favorite coffees and perfect your brewing technique.</p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-[#1B4332] mr-3" />
              <h2 className="text-xl font-serif text-[#1B4332]">Analyze Your Preferences</h2>
            </div>
            <p className="text-gray-600">Track your coffee preferences over time. Discover patterns in your taste and improve your brewing skills with data-driven insights.</p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-[#1B4332] mr-3" />
              <h2 className="text-xl font-serif text-[#1B4332]">Join the Community</h2>
            </div>
            <p className="text-gray-600">Connect with other coffee enthusiasts. Share your experiences, learn from others, and be part of a growing community of coffee lovers.</p>
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
