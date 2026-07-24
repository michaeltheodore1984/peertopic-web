'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Avatar from 'react-avatar';
import { Session } from 'next-auth';

interface SessionHeaderProps {
  session: Session;
}

export default function SessionHeader({ session }: SessionHeaderProps) {
  // const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 text-white shadow-md w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className='text-2xl font-semibold font-comfortaa text-orange-600'>
          peer<span className='text-amber-500'>topic</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <>
            {/* Explore Button */}
            <Link
              href="/explore"
              className="px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white text-sm font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
            >
              Explore
            </Link>

            {/* Avatar Dropdown */}
            <div ref={dropdownRef} className="relative ml-4">
              <button data-testid="avatar-dropdown-toggle-desktop"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <Avatar name={session.user?.name || 'User'} size="40" round />
                <span className="hidden md:inline">{session.user?.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700 rounded"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/history"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700 rounded"
                  >
                    History
                  </Link>
                  <Link
                    href="/messages"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700 rounded"
                  >
                    Messages
                  </Link>
                  <button data-testid="signout-button-desktop"
                    onClick={() => {
                      signOut({ callbackUrl: '/signin' });
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        </nav>

        {/* Mobile menu button */}
        <button data-testid='mobile-menu-button-dropdown'
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md shadow-lg text-white z-40">
          <nav className="flex flex-col space-y-4 px-6 py-4 items-start">
            <>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white text-sm font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
              >
                Explore
              </Link>

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Profile
              </Link>

              <Link
                href="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                History
              </Link>
              <Link
                href="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Messages
              </Link>
              <button data-testid='signout-button-mobile'
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-600 rounded"
              >
                Sign Out
              </button>
            </>

          </nav>
        </div>
      )}
    </header>
  );
};