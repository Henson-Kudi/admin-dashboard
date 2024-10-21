'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw, HomeIcon } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [countdown, setCountdown] = useState(5)
  const [isRepairing, setIsRepairing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRepair = () => {
    setIsRepairing(true)
    setTimeout(() => {
      setIsRepairing(false)
      reset()
    }, 2000)
  }

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
          <div className="text-center relative z-10 max-w-2xl">
            <AlertTriangle className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold mb-4">Houston, We've Got a Problem!</h1>
            <p className="text-xl mb-6">An unexpected error has occurred in our space station.</p>
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-400">Error details:</p>
              <p className="font-mono text-red-400">{error.message || 'Unknown error'}</p>
            </div>
            <div className="space-y-4">
              <Button 
                onClick={handleRepair} 
                disabled={isRepairing}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full"
              >
                {isRepairing ? (
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="mr-2 h-4 w-4" />
                )}
                {isRepairing ? 'Repairing...' : 'Initiate Repair Sequence'}
              </Button>
              <p className="text-sm">
                {countdown > 0 
                  ? `Automatic repair attempt in ${countdown} seconds...` 
                  : 'Automatic repair attempt initiated...'}
              </p>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full">
                  <HomeIcon className="mr-2 h-4 w-4" /> Return to Mission Control
                </Button>
              </Link>
            </div>
          </div>

          {/* Animated stars */}
          <div className="fixed inset-0 z-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Floating astronaut */}
          <div className="absolute bottom-10 right-10 animate-float hidden md:block">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" fill="#E6E6E6"/>
              <path d="M50 70C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70Z" fill="#4A4A4A"/>
              <path d="M50 65C58.2843 65 65 58.2843 65 50C65 41.7157 58.2843 35 50 35C41.7157 35 35 41.7157 35 50C35 58.2843 41.7157 65 50 65Z" fill="#CCCCCC"/>
            </svg>
          </div>
        </div>
      </body>
    </html>
  )
}