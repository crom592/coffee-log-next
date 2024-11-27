'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    setShowUserMenu(false)
    await signOut({ callbackUrl: '/' })
  }

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
            My Logs
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
          <div className="user-menu-container" ref={dropdownRef}>
            {status === 'authenticated' && session.user ? (
              <>
                <button 
                  className="user-menu-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="user-avatar-container">
                    <Image
                      src={session.user.image || '/images/default-avatar.png'}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="user-avatar"
                    />
                  </div>
                  {session.user.name && (
                    <span className="user-name">{session.user.name}</span>
                  )}
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <span className="dropdown-user-name">{session.user.name}</span>
                      <span className="dropdown-user-email">{session.user.email}</span>
                    </div>
                    <Link 
                      href="/profile" 
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      href="/settings" 
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Settings
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="dropdown-item text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/auth/signin" className="nav-item">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
