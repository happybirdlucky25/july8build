"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => {
    return pathname === path ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-700 hover:text-white";
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              PoliUX
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/dashboard")}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/search/legislation"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/search/legislation")}`}
                >
                  Search Bills
                </Link>
                <Link
                  href="/search/legislators"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/search/legislators")}`}
                >
                  Search Legislators
                </Link>
                <Link
                  href="/tracked"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/tracked")}`}
                >
                  Tracked
                </Link>
                <Link
                  href="/campaigns"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/campaigns")}`}
                >
                  Campaigns
                </Link>
                <Link
                  href="/info-center"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/info-center")}`}
                >
                  Info Center
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {user.email?.split('@')[0]}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b">
                        {user.email}
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/")}`}
                >
                  Home
                </Link>
                <Link
                  href="/constitution"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/constitution")}`}
                >
                  Constitution
                </Link>
                <Link
                  href="/info-center"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/info-center")}`}
                >
                  Info Center
                </Link>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-blue-900 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
