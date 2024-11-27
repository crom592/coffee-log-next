import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ClientHome from '@/components/client-home'

export const metadata: Metadata = {
  title: 'Coffee Log - Home',
  description: 'Track and share your coffee experiences',
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <main className="min-h-screen">
      <ClientHome session={session} />
    </main>
  )
}