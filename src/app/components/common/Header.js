// =============================================================================
// HEADER COMPONENT - src/components/common/Header.js
// =============================================================================

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, Menu, X, User, LogOut, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header({ variant = 'landing' }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
  }
  console.log(variant);

  // Landing page header (public)
  if (variant === 'landing') {
    return (
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ShipInvoice Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }

  // Auth page header (login/register)
  if (variant === 'auth') {
    return (
      <>
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Package className="h-5 w-5" />
            <span className="font-medium">ShipInvoice Pro</span>
          </Link>
        </div>
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </>
    )
  }

  // Dashboard header (authenticated)
  if (variant === 'dashboard') {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ShipInvoice Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === '/dashboard'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Dashboard
              </Link>
              <Link
                href="/shipments"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/shipments')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Shipments
              </Link>
              <Link
                href="/invoices"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/invoices')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Invoices
              </Link>
              <Link
                href="/customers"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/customers')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Customers
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-600 hover:text-gray-900 p-2"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === '/dashboard'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/shipments"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/shipments')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shipments
                </Link>
                <Link
                  href="/invoices"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/invoices')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Invoices
                </Link>
                <Link
                  href="/customers"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/customers')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Customers
                </Link>

                {user && (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors text-sm px-3 py-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }

  return null
}
