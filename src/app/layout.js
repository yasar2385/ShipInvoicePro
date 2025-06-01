// =============================================================================
// 1. LANDING PAGE - src/app/layout.js
// =============================================================================
// src\app\layout.js

import './globals.css'
import { Inter } from 'next/font/google'
// import Providers from './components/Providers'
import { Layout } from './components/common/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shipment & Invoice Manager',
  description: 'Manage your shipments and invoices efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Providers></Providers> */}
          {children}        
      </body>
    </html>
  )
}