"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function SignInPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">PoliUX</h1>
        </Link>
        <p className="mt-2 text-center text-sm text-gray-600">
          Legislative tracking and civic engagement platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode="signin" onSuccess={handleSuccess} />
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
