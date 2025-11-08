"use client"

import { useEffect, useState } from "react"

const roles = ["Senior Trainer", "Fullstack Developer", "CEO Sobat Psikotes"]

export function AnimatedRole() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    if (!isDeleting && displayedText === currentRole) {
      // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayedText === "") {
      // Move to next role
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % roles.length)
      return
    }

    // Type or delete character
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1)
        } else {
          return currentRole.substring(0, prev.length + 1)
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentIndex])

  return (
    <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
      {displayedText}
      <span className="animate-pulse text-accent">|</span>
    </h1>
  )
}
