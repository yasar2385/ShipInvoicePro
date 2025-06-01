
// =============================================================================
// LAYOUT WRAPPER COMPONENT - src/components/common/Layout.js
// =============================================================================

import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children, variant = 'landing', className = '' }) {
    return (
        <div className={`min-h-screen flex flex-col ${className}`}>
            <Header variant={variant} />
            <main className="flex-1">
                {children}
            </main>
            <Footer variant={variant} />
        </div>
    )
}