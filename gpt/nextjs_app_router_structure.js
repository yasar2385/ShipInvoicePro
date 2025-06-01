// Updated Next.js 14 App Router Structure
// shipment-invoice-system/

/*
shipment-invoice-system/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.js
│   │   │   └── register/
│   │   │       └── page.js
│   │   ├── (dashboard)/
│   │   │   ├── customers/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── error.js
│   │   │   │   └── page.js
│   │   │   ├── shipments/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   ├── track/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── error.js
│   │   │   │   └── page.js
│   │   │   ├── invoices/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── edit/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   ├── pdf/
│   │   │   │   │   │   └── page.js
│   │   │   │   │   └── page.js
│   │   │   │   ├── new/
│   │   │   │   │   └── page.js
│   │   │   │   ├── loading.js
│   │   │   │   ├── error.js
│   │   │   │   └── page.js
│   │   │   ├── dashboard/
│   │   │   │   ├── loading.js
│   │   │   │   └── page.js
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── api/
│   │   │   ├── customers/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   ├── shipments/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   ├── invoices/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── pdf/
│   │   │   │   │   │   └── route.js
│   │   │   │   │   └── route.js
│   │   │   │   └── route.js
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       │   └── route.js
│   │   │       └── register/
│   │   │           └── route.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── loading.js
│   │   ├── error.js
│   │   ├── not-found.js
│   │   └── page.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   ├── Card.js
│   │   │   ├── Badge.js
│   │   │   ├── Table.js
│   │   │   ├── Pagination.js
│   │   │   ├── SearchBar.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── Toast.js
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   ├── DashboardLayout.js
│   │   │   ├── AuthLayout.js
│   │   │   └── Footer.js
│   │   ├── customers/
│   │   │   ├── CustomerForm.js
│   │   │   ├── CustomerList.js
│   │   │   ├── CustomerCard.js
│   │   │   ├── CustomerDetails.js
│   │   │   └── CustomerStats.js
│   │   ├── shipments/
│   │   │   ├── ShipmentForm.js
│   │   │   ├── ShipmentList.js
│   │   │   ├── ShipmentCard.js
│   │   │   ├── ShipmentDetails.js
│   │   │   ├── TrackingStatus.js
│   │   │   ├── TrackingTimeline.js
│   │   │   └── ShipmentStats.js
│   │   ├── invoices/
│   │   │   ├── InvoiceForm.js
│   │   │   ├── InvoiceList.js
│   │   │   ├── InvoiceCard.js
│   │   │   ├── InvoiceDetails.js
│   │   │   ├── InvoicePDF.js
│   │   │   ├── PaymentStatus.js
│   │   │   └── InvoiceStats.js
│   │   ├── dashboard/
│   │   │   ├── StatCard.js
│   │   │   ├── RecentActivity.js
│   │   │   ├── Charts.js
│   │   │   ├── QuickActions.js
│   │   │   └── Overview.js
│   │   └── auth/
│   │       ├── LoginForm.js
│   │       ├── RegisterForm.js
│   │       └── AuthGuard.js
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.js
│   │   │   ├── auth.js
│   │   │   ├── firestore.js
│   │   │   └── storage.js
│   │   ├── utils/
│   │   │   ├── format.js
│   │   │   ├── validation.js
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCustomers.js
│   │   │   ├── useShipments.js
│   │   │   ├── useInvoices.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useDebounce.js
│   │   └── services/
│   │       ├── customerService.js
│   │       ├── shipmentService.js
│   │       ├── invoiceService.js
│   │       ├── authService.js
│   │       └── emailService.js
│   └── types/
│       ├── customer.js
│       ├── shipment.js
│       ├── invoice.js
│       └── auth.js
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── placeholder.png
│   ├── icons/
│   │   ├── favicon.ico
│   │   └── apple-icon.png
│   └── manifest.json
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── vercel.json
*/

// =============================================================================
// 1. ROOT LAYOUT (App Router Entry Point)
// =============================================================================

// src/app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shipment & Invoice Manager',
  description: 'Manage your shipments and invoices efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

// =============================================================================
// 2. DASHBOARD LAYOUT (Protected Routes)
// =============================================================================

// src/app/(dashboard)/layout.js
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  )
}

// src/components/layout/DashboardLayout.js
'use client'
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// =============================================================================
// 3. DASHBOARD HOME PAGE
// =============================================================================

// src/app/(dashboard)/page.js
import { Suspense } from 'react'
import { Overview } from '@/components/dashboard/Overview'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { StatCard } from '@/components/dashboard/StatCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Overview />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading recent activity...</div>}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  )
}

// =============================================================================
// 4. CUSTOMERS PAGES
// =============================================================================

// src/app/(dashboard)/customers/page.js
import { Suspense } from 'react'
import Link from 'next/link'
import { CustomerList } from '@/components/customers/CustomerList'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Link href="/customers/new">
          <Button>Add Customer</Button>
        </Link>
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <CustomerList />
      </Suspense>
    </div>
  )
}

// src/app/(dashboard)/customers/new/page.js
import { CustomerForm } from '@/components/customers/CustomerForm'

export default function NewCustomerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">Add New Customer</h1>
      </div>
      
      <div className="max-w-2xl">
        <CustomerForm />
      </div>
    </div>
  )
}

// src/app/(dashboard)/customers/[id]/page.js
import { Suspense } from 'react'
import { CustomerDetails } from '@/components/customers/CustomerDetails'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function CustomerDetailPage({ params }) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<LoadingSpinner />}>
        <CustomerDetails id={params.id} />
      </Suspense>
    </div>
  )
}

// =============================================================================
// 5. SHIPMENTS PAGES
// =============================================================================

// src/app/(dashboard)/shipments/page.js
import { Suspense } from 'react'
import Link from 'next/link'
import { ShipmentList } from '@/components/shipments/ShipmentList'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
        <Link href="/shipments/new">
          <Button>Create Shipment</Button>
        </Link>
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ShipmentList />
      </Suspense>
    </div>
  )
}

// src/app/(dashboard)/shipments/[id]/track/page.js
import { Suspense } from 'react'
import { TrackingTimeline } from '@/components/shipments/TrackingTimeline'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function TrackShipmentPage({ params }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Track Shipment</h1>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TrackingTimeline shipmentId={params.id} />
      </Suspense>
    </div>
  )
}

// =============================================================================
// 6. INVOICES PAGES
// =============================================================================

// src/app/(dashboard)/invoices/page.js
import { Suspense } from 'react'
import Link from 'next/link'
import { InvoiceList } from '@/components/invoices/InvoiceList'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <Link href="/invoices/new">
          <Button>Create Invoice</Button>
        </Link>
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <InvoiceList />
      </Suspense>
    </div>
  )
}

// src/app/(dashboard)/invoices/[id]/pdf/page.js
import { InvoicePDF } from '@/components/invoices/InvoicePDF'

export default function InvoicePDFPage({ params }) {
  return (
    <div className="min-h-screen bg-white">
      <InvoicePDF invoiceId={params.id} />
    </div>
  )
}

// =============================================================================
// 7. API ROUTES (App Router)
// =============================================================================

// src/app/api/customers/route.js
import { NextResponse } from 'next/server'
import { customerService } from '@/lib/services/customerService'

export async function GET() {
  try {
    const customers = await customerService.getAll()
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const id = await customerService.create(data)
    return NextResponse.json({ id }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}

// src/app/api/customers/[id]/route.js
import { NextResponse } from 'next/server'
import { customerService } from '@/lib/services/customerService'

export async function GET(request, { params }) {
  try {
    const customer = await customerService.getById(params.id)
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }
    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    await customerService.update(params.id, data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await customerService.delete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
}

// =============================================================================
// 8. LOADING AND ERROR PAGES
// =============================================================================

// src/app/(dashboard)/customers/loading.js
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-96">
      <LoadingSpinner size="lg" />
    </div>
  )
}

// src/app/(dashboard)/customers/error.js
'use client'
import { Button } from '@/components/ui/Button'

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
      <h2 className="text-xl font-semibold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}

// =============================================================================
// 9. AUTHENTICATION PAGES
// =============================================================================

// src/app/(auth)/layout.js
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function Layout({ children }) {
  return <AuthLayout>{children}</AuthLayout>
}

// src/app/(auth)/login/page.js
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
        <p className="text-gray-600 mt-2">Access your shipment management dashboard</p>
      </div>
      <LoginForm />
    </div>
  )
}

// =============================================================================
// 10. CONFIGURATION FILES
// =============================================================================

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  env: {
    CUSTOM_KEY: 'shipment-invoice-system',
  },
}

module.exports = nextConfig

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}

// package.json
/*
{
  "name": "shipment-invoice-system",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "firebase": "^10.5.0",
    "swr": "^2.2.4",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1",
    "date-fns": "^2.30.0",
    "react-hook-form": "^7.47.0",
    "lucide-react": "^0.292.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "eslint": "^8.52.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5"
  }
}
*/