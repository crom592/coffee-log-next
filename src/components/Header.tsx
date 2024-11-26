'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  return (
    <header className="app-header">
      <nav className="nav-container">
        <Link href="/" className="logo-link">
          <div className="logo">
            <Image
              src="/images/coffee-bag.png"
              alt="Coffee Log"
              width={32}
              height={32}
              className="logo-image"
            />
            <span className="logo-text">Coffee Log</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link 
            href="/logs" 
            className={`nav-item ${pathname.startsWith('/logs') ? 'active' : ''}`}
          >
            Logs
          </Link>
          <Link 
            href="/community" 
            className={`nav-item ${pathname.startsWith('/community') ? 'active' : ''}`}
          >
            Community
          </Link>
          <Link 
            href="/about" 
            className={`nav-item ${pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
