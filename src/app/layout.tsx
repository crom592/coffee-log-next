import type { Metadata } from "next"
import { Providers } from "./providers"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Coffee Log",
  description: "나만의 커피 기록",
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
          <header className="header">
            <div className="container header-content">
              <a href="/" className="logo">Coffee Log</a>
              <nav className="nav-menu">
                <a href="/logs" className="nav-link">커피 기록</a>
                <a href="/community" className="nav-link">커뮤니티</a>
                <a href="/settings" className="nav-link">설정</a>
              </nav>
            </div>
          </header>
          <main className="main">
            <div className="container">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
