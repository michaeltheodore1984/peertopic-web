'use client';

import { User } from "@/lib/models";
import { Search, User as UserIcon, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { capitalizeFirstLetter } from "./f";
import Link from "next/link";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <header className="bg-blue-400 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-lg font-bold">PeerTopic</h1>
      <Link href='/explore'><span className="flex px-8 py-1 bg-blue-200 hover:bg-blue-300 rounded-full border text-sm text-gray-800 transition-colors items-center cursor-pointer">Explore &nbsp;<Search size={16} /></span></Link>
      {/* <Link href='/tutor'><span className="ml-4 flex px-8 py-1 bg-blue-200 hover:bg-blue-300 rounded-full border text-sm transition-colors items-center cursor-pointer">Tutor Dashboard</span></Link> */}

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <span className="font-semibold hidden">{user.firstName != 'none' ? 'Welcome, ' + capitalizeFirstLetter(user.firstName) : 'Welcome'}</span>
          {menuOpen ? <X className="w-6 h-6 cursor-pointer" /> :
            <UserIcon className="w-6 h-6 cursor-pointer" />}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="/messages" className="block px-4 py-2 hover:bg-gray-100">Messages</a>
            <a onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
}