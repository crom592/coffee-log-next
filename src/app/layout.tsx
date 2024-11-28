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
    icon: [
      {
        url: '/favicon/favicon.png',
        type: 'image/png',
      }
    ],
    shortcut: '/favicon/favicon.png',
    apple: '/favicon/favicon.png',
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
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon/favicon.png" />
      </head>
      <body className={notoSerif.className}>
        <SessionProvider session={session}>
          <Navigation />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
