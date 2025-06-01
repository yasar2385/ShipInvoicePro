// =============================================================================
// 1. REGISTER PAGE - src/app/(auth)/register/page.js
// =============================================================================

import { RegisterForm } from '../RegisterForm'
import Link from 'next/link'
import { Package, ArrowLeft, CheckCircle } from 'lucide-react'
import { Layout } from '@/app/components/common/Layout'

export const metadata = {
  title: 'Create Account',
  description: 'Create your ShipInvoice Pro account and start managing your logistics'
}



export default function RegisterPage() {
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
                Create your account
              </h2>
              <p className="text-gray-600">
                Start managing your logistics with ShipInvoice Pro
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">What you ll get:</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Real-time shipment tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Professional invoice generation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Business analytics & reports</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">Customer management tools</span>
                </li>
              </ul>
            </div>

            {/* Register Form */}
            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
              <RegisterForm />
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign in here
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