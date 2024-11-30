import type { Metadata } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notoSerif.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
