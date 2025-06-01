// src/components/Providers.js
'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'

// =============================================================================
// AUTH CONTEXT
// =============================================================================
const AuthContext = createContext({})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        authenticated: !!action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        loading: false,
        authenticated: false
      }
    default:
      return state
  }
}

const initialAuthState = {
  user: null,
  loading: true,
  authenticated: false
}

// =============================================================================
// TOAST CONTEXT
// =============================================================================
const ToastContext = createContext({})

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }]
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      }
    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: []
      }
    default:
      return state
  }
}

const initialToastState = {
  toasts: []
}

// =============================================================================
// APP CONTEXT (Global App State)
// =============================================================================
const AppContext = createContext({})

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload
      }
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        globalLoading: action.payload
      }
    default:
      return state
  }
}

const initialAppState = {
  sidebarOpen: false,
  theme: 'light',
  globalLoading: false
}

// =============================================================================
// PROVIDER COMPONENTS
// =============================================================================

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'SET_USER', payload: user })
    })

    return () => unsubscribe()
  }, [])

  const value = {
    ...state,
    dispatch
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialToastState)

  const addToast = (toast) => {
    dispatch({ type: 'ADD_TOAST', payload: toast })
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: toast.id || Date.now() })
    }, toast.duration || 5000)
  }

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }

  const clearToasts = () => {
    dispatch({ type: 'CLEAR_TOASTS' })
  }

  const value = {
    ...state,
    addToast,
    removeToast,
    clearToasts
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  const setSidebarOpen = (open) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open })
  }

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
    // Persist theme to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }

  const setGlobalLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        dispatch({ type: 'SET_THEME', payload: savedTheme })
      }
    }
  }, [])

  const value = {
    ...state,
    setSidebarOpen,
    toggleSidebar,
    setTheme,
    setGlobalLoading
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// =============================================================================
// MAIN PROVIDERS COMPONENT
// =============================================================================
export function Providers({ children }) {
  return (
    <AppProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </AuthProvider>
    </AppProvider>
  )
}

// =============================================================================
// TOAST CONTAINER (Renders toasts)
// =============================================================================
function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto 
            flex ring-1 ring-black ring-opacity-5 transform transition-all duration-300
            ${toast.type === 'success' ? 'border-l-4 border-green-400' : ''}
            ${toast.type === 'error' ? 'border-l-4 border-red-400' : ''}
            ${toast.type === 'warning' ? 'border-l-4 border-yellow-400' : ''}
            ${toast.type === 'info' ? 'border-l-4 border-blue-400' : ''}
          `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {toast.type === 'success' && (
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {toast.type === 'error' && (
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {toast.type === 'warning' && (
                  <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
                {toast.type === 'info' && (
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                {toast.title && (
                  <p className="text-sm font-medium text-gray-900">{toast.title}</p>
                )}
                <p className="text-sm text-gray-500">{toast.message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => removeToast(toast.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Helper function to show toast notifications
export const toast = {
  success: (message, title = 'Success') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { type: 'success', message, title }
      }))
    }
  },
  error: (message, title = 'Error') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { type: 'error', message, title }
      }))
    }
  },
  warning: (message, title = 'Warning') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { type: 'warning', message, title }
      }))
    }
  },
  info: (message, title = 'Info') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { type: 'info', message, title }
      }))
    }
  }
}