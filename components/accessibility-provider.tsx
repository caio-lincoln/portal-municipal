"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  fontSize: "normal" | "large" | "xlarge"
  setFontSize: (size: "normal" | "large" | "xlarge") => void
  colorBlindMode: "none" | "grayscale" | "deuteranopia" | "protanopia" | "tritanopia"
  setColorBlindMode: (mode: "none" | "grayscale" | "deuteranopia" | "protanopia" | "tritanopia") => void
  contrastBoost: boolean
  toggleContrastBoost: () => void
  pageZoom: 100 | 125 | 150
  setPageZoom: (zoom: 100 | 125 | 150) => void
  speak: (text: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal")
  const [colorBlindMode, setColorBlindMode] = useState<
    "none" | "grayscale" | "deuteranopia" | "protanopia" | "tritanopia"
  >("none")
  const [contrastBoost, setContrastBoost] = useState(false)
  const [pageZoom, setPageZoom] = useState<100 | 125 | 150>(100)

  useEffect(() => {
    // Load preferences from localStorage
    const savedContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = (localStorage.getItem("fontSize") as "normal" | "large" | "xlarge") || "normal"
    const savedColorBlindMode =
      (localStorage.getItem("colorBlindMode") as "none" | "grayscale" | "deuteranopia" | "protanopia" | "tritanopia") ||
      "none"
    const savedContrastBoost = localStorage.getItem("contrastBoost") === "true"
    const savedZoom = (parseInt(localStorage.getItem("pageZoom") || "100", 10) as 100 | 125 | 150) || 100

    setHighContrast(savedContrast)
    setFontSize(savedFontSize)
    setColorBlindMode(savedColorBlindMode)
    setContrastBoost(savedContrastBoost)
    setPageZoom(savedZoom)
  }, [])

  useEffect(() => {
    // Apply high contrast mode (uses dark theme variables defined in CSS)
    if (highContrast) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("highContrast", String(highContrast))
  }, [highContrast])

  useEffect(() => {
    // Apply font size classes on html element
    document.documentElement.classList.remove("text-normal", "text-large", "text-xlarge")
    document.documentElement.classList.add(`text-${fontSize}`)
    localStorage.setItem("fontSize", fontSize)
  }, [fontSize])

  useEffect(() => {
    // Apply color blindness filters via class on html element
    const cbClasses = [
      "colorblind-grayscale",
      "colorblind-deuteranopia",
      "colorblind-protanopia",
      "colorblind-tritanopia",
    ]
    const paletteClasses = [
      "cb-palette-grayscale",
      "cb-palette-deuteranopia",
      "cb-palette-protanopia",
      "cb-palette-tritanopia",
    ]
    cbClasses.forEach((c) => document.documentElement.classList.remove(c))
    paletteClasses.forEach((c) => document.documentElement.classList.remove(c))
    if (colorBlindMode !== "none") {
      document.documentElement.classList.add(`colorblind-${colorBlindMode}`)
      document.documentElement.classList.add(`cb-palette-${colorBlindMode}`)
    }
    localStorage.setItem("colorBlindMode", colorBlindMode)
  }, [colorBlindMode])

  useEffect(() => {
    // Apply contrast boost filter
    const cls = "contrast-boost"
    if (contrastBoost) {
      document.documentElement.classList.add(cls)
    } else {
      document.documentElement.classList.remove(cls)
    }
    localStorage.setItem("contrastBoost", String(contrastBoost))
  }, [contrastBoost])

  useEffect(() => {
    // Apply page zoom via class on html element
    document.documentElement.classList.remove("zoom-100", "zoom-125", "zoom-150")
    document.documentElement.classList.add(`zoom-${pageZoom}`)
    localStorage.setItem("pageZoom", String(pageZoom))
  }, [pageZoom])

  const toggleHighContrast = () => setHighContrast(!highContrast)
  const toggleContrastBoost = () => setContrastBoost((v) => !v)

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "pt-BR"
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        colorBlindMode,
        setColorBlindMode,
        contrastBoost,
        toggleContrastBoost,
        pageZoom,
        setPageZoom,
        speak,
      }}
    >
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
