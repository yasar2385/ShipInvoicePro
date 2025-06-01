// =============================================================================
// 3. DASHBOARD HOME PAGE
// =============================================================================

// src/app/(dashboard)/page.js
import { Suspense } from 'react'
// import { Overview } from '@/components/dashboard/Overview'
// import { RecentActivity } from '@/components/dashboard/RecentActivity'
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
        {/* <Overview /> */}
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading recent activity...</div>}>
          {/* <RecentActivity /> */}
        </Suspense>
      </div>
    </div>
  )
}