// =============================================================================
// 2. REGISTER FORM COMPONENT - src/components/auth/RegisterForm.js
// =============================================================================

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, Loader2, CheckCircle, XCircle } from 'lucide-react'

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    const feedback = []
    let score = 0

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('At least 8 characters')
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include lowercase letter')
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include uppercase letter')
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push('Include a number')
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include special character')
    }

    setPasswordStrength({ score, feedback })
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-red-500'
    if (passwordStrength.score <= 2) return 'bg-orange-500'
    if (passwordStrength.score <= 3) return 'bg-yellow-500'
    if (passwordStrength.score <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return 'Weak'
    if (passwordStrength.score <= 2) return 'Fair'
    if (passwordStrength.score <= 3) return 'Good'
    if (passwordStrength.score <= 4) return 'Strong'
    return 'Very Strong'
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak. Please create a stronger password.'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, create a user account
      // In real app, this would make an API call to your registration service
      
      const userData = {
        id: 'user_' + Date.now(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        company: formData.company,
        role: 'user',
        createdAt: new Date().toISOString(),
        subscribeNewsletter: formData.subscribeNewsletter
      }
      
      // Store auth token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', 'demo-token-' + Date.now())
        localStorage.setItem('user', JSON.stringify(userData))
      }
      
      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className={`h-5 w-5 ${errors.firstName ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.firstName 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'
              }`}
              placeholder="John"
            />
          </div>
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className={`h-5 w-5 ${errors.lastName ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.lastName 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.email 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="john@company.com"
          />
        </div>
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone and Company Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className={`h-5 w-5 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.phone 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className={`h-5 w-5 ${errors.company ? 'text-red-400' : 'text-gray-400'}`} />
            </div>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.company 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'
              }`}
              placeholder="Acme Corporation"
            />
          </div>
          {errors.company && (
            <p className="mt-2 text-sm text-red-600">{errors.company}</p>
          )}
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={formData.password}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.password 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${
                passwordStrength.score <= 2 ? 'text-red-600' : 
                passwordStrength.score <= 3 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            {passwordStrength.feedback.length > 0 && (
              <ul className="text-sm text-gray-600 space-y-1">
                {passwordStrength.feedback.map((feedback, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <XCircle className="h-3 w-3 text-red-400" />
                    <span>{feedback}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`h-5 w-5 ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.confirmPassword 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {/* Password Match Indicator */}
        {formData.confirmPassword && (
          <div className="mt-2 flex items-center space-x-2">
            {formData.password === formData.confirmPassword ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Passwords match</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">Passwords don&lsquo;t match</span>
              </>
            )}
          </div>
        )}
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms and Newsletter */}
      <div className="space-y-4">
        <div className="flex items-start">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 ${
              errors.agreeToTerms ? 'border-red-300' : ''
            }`}
          />
          <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
            I agree to the{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
        )}

        <div className="flex items-start">
          <input
            id="subscribeNewsletter"
            name="subscribeNewsletter"
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="subscribeNewsletter" className="ml-3 block text-sm text-gray-700">
            Subscribe to our newsletter for updates and logistics tips (optional)
          </label>
        </div>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
          isLoading 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Creating Account...</span>
          </div>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          <strong>Demo Mode:</strong> Fill out the form to create your demo account. All fields are required for the best experience.
        </p>
      </div>
    </form>
  )
}