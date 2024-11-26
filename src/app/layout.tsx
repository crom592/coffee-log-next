import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Coffee Log",
  description: "나만의 커피 기록",
  icons: {
    icon: [
      {
        url: "/images/coffee-bag.png",
        type: "image/png",
      }
    ],
    shortcut: ["/images/coffee-bag.png"],
    apple: [
      {
        url: "/images/coffee-bag.png",
        type: "image/png",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
