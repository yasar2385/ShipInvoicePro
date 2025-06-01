// =============================================================================
// 2. LOGIN PAGE - src/app/(auth)/login/page.js
// =============================================================================

import { LoginForm } from '../LoginForm'
import Link from 'next/link'
import { Package, ArrowLeft } from 'lucide-react'
import { Layout } from '@/app/components/common/Layout'


export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your ShipInvoice Pro account'
}

export default function LoginPage() {
  return (
    <Layout variant="auth" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
        {/* Header */}
        {/* <div className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div> */}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Logo and Title */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-600 p-3 rounded-2xl">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to your ShipInvoice Pro account
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
              <LoginForm />
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don&lsquo;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="p-6 text-center text-gray-500 text-sm">
        © 2025 ShipInvoice Pro. All rights reserved.
      </div> */}
      </div>
    </Layout>
  )

}