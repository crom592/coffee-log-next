'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center px-2 text-yellow-500 font-bold text-xl">
                Coffee Log
              </Link>
              {session && (
                <div className="ml-8 flex items-center space-x-4">
                  <Link
                    href="/log"
                    className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    New Log
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {session ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-300">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
