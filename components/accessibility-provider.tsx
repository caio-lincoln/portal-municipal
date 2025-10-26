"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  fontSize: "normal" | "large" | "xlarge"
  setFontSize: (size: "normal" | "large" | "xlarge") => void
  speak: (text: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal")

  useEffect(() => {
    // Load preferences from localStorage
    const savedContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = (localStorage.getItem("fontSize") as "normal" | "large" | "xlarge") || "normal"
    setHighContrast(savedContrast)
    setFontSize(savedFontSize)
  }, [])

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("highContrast", String(highContrast))
  }, [highContrast])

  useEffect(() => {
    // Apply font size
    document.documentElement.classList.remove("text-normal", "text-large", "text-xlarge")
    document.documentElement.classList.add(`text-${fontSize}`)
    localStorage.setItem("fontSize", fontSize)
  }, [fontSize])

  const toggleHighContrast = () => setHighContrast(!highContrast)

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "pt-BR"
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast, fontSize, setFontSize, speak }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}
