import type { Metadata } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'
import Navigation from '@/components/Navigation'

const notoSerif = Noto_Serif_KR({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
})

export const metadata: Metadata = {
  title: 'Coffee Log',
  description: 'Track your coffee brewing journey',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={notoSerif.className}>
        <SessionProvider session={session}>
          <Navigation />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
