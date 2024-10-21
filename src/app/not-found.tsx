'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { HomeIcon, Rocket } from 'lucide-react'

export default function NotFound() {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [score, setScore] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    setScore(prevScore => prevScore + 1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 overflow-hidden">
      <div className="text-center relative z-10">
        <h1 className="text-8xl font-bold mb-4 animate-pulse">404</h1>
        <p className="text-2xl font-semibold mb-6">Houston, we have a problem!</p>
        <p className="text-lg mb-8 max-w-md">
          It seems your spacecraft has drifted into uncharted space. 
          The page you&apos;re looking for has been lost in a black hole.
        </p>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <HomeIcon className="mr-2 h-4 w-4" /> Return to Earth
          </Button>
        </Link>
        <p className="mt-4 text-sm">
          While you&apos;re here, try catching the UFO! Score: {score}
        </p>
      </div>

      {/* Animated stars */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
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

      {/* Clickable UFO */}
      <div
        className="absolute transition-all duration-1000 ease-in-out cursor-pointer"
        style={{ top: `${position.y}%`, left: `${position.x}%` }}
        onClick={handleClick}
      >
        <Rocket size={32} className="text-green-400 animate-bounce" />
      </div>
    </div>
  )
}