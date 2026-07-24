'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Avatar from 'react-avatar';

const Header = () => {
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
        <Link href="/" className='text-2xl font-semibold font-comfortaa text-orange-500'>
          peer<span className='text-amber-500'>topic</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <>
            <Link
              href="/signin"
              className="px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white font-bold rounded-lg text-sm shadow hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
            <Link
              href="/explore"
              className="px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white text-sm font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
            >
              Explore
            </Link>
          </>
          {/* )} */}
        </nav>

        {/* Mobile menu button */}
        <button
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
              <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-400">
                How It Works
              </Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-400">
                Pricing
              </Link>
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-400">
                Contact
              </Link>
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className=" px-4 py-2 bg-gradient-to-r from-[#7c5cff] to-[#4ec5ff] text-white font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
              >
                Explore
              </Link>
            </>
            {/* )} */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
