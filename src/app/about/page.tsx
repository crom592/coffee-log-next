import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, PenLine, BarChart3, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Coffee Log',
  description: 'Learn more about Coffee Log and its features',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex items-center mb-8">
          <Link href="/">
            <button className="mr-4 p-2 hover:bg-[#E9E5E0] rounded-lg transition-colors">
              <ChevronLeft className="h-6 w-6 text-[#1B4332]" />
            </button>
          </Link>
          <h1 className="text-[#1B4332] text-2xl font-serif">About Coffee Log</h1>
        </header>

        <div className="space-y-8">
          <div className="bg-[#E9E5E0] rounded-2xl p-6">
            <h2 className="text-xl font-serif text-[#1B4332] mb-4">What is Coffee Log?</h2>
            <p className="text-[#1B4332]/80 leading-relaxed">
              Coffee Log is your digital companion for documenting and sharing your coffee journey. 
              Whether you're a casual coffee drinker or a dedicated enthusiast, our platform helps 
              you track every detail of your coffee experiences.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-serif text-[#1B4332] px-2">Key Features</h2>
            
            <div className="bg-[#E9E5E0] rounded-2xl p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1B4332] rounded-lg">
                  <PenLine className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-[#1B4332] mb-1">Detailed Logging</h3>
                  <p className="text-[#1B4332]/80 text-sm">
                    Record every aspect of your coffee, from bean origin to brewing parameters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1B4332] rounded-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-[#1B4332] mb-1">Data Analysis</h3>
                  <p className="text-[#1B4332]/80 text-sm">
                    Track your preferences and discover patterns in your coffee experiences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#1B4332] rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-[#1B4332] mb-1">Community</h3>
                  <p className="text-[#1B4332]/80 text-sm">
                    Share experiences and learn from fellow coffee enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#E9E5E0] rounded-2xl p-6">
            <h2 className="text-xl font-serif text-[#1B4332] mb-4">Getting Started</h2>
            <ol className="space-y-4 text-[#1B4332]/80">
              <li className="flex gap-3">
                <span className="font-serif text-[#1B4332]">1.</span>
                Create an account to start your coffee journey
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-[#1B4332]">2.</span>
                Log your first coffee experience with our detailed form
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-[#1B4332]">3.</span>
                Share your insights with the community
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
