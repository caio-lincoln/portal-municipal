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
  dyslexiaFont: boolean
  toggleDyslexiaFont: () => void
  lineSpacing: "normal" | "relaxed" | "loose"
  setLineSpacing: (spacing: "normal" | "relaxed" | "loose") => void
  letterSpacing: "normal" | "wide" | "wider"
  setLetterSpacing: (spacing: "normal" | "wide" | "wider") => void
  focusMode: boolean
  toggleFocusMode: () => void
  readingGuide: boolean
  toggleReadingGuide: () => void
  simplifiedLayout: boolean
  toggleSimplifiedLayout: () => void
  animationsReduced: boolean
  toggleAnimationsReduced: () => void
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
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [lineSpacing, setLineSpacing] = useState<"normal" | "relaxed" | "loose">("normal")
  const [letterSpacing, setLetterSpacing] = useState<"normal" | "wide" | "wider">("normal")
  const [focusMode, setFocusMode] = useState(false)
  const [readingGuide, setReadingGuide] = useState(false)
  const [simplifiedLayout, setSimplifiedLayout] = useState(false)
  const [animationsReduced, setAnimationsReduced] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const savedContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = (localStorage.getItem("fontSize") as "normal" | "large" | "xlarge") || "normal"
    const savedColorBlindMode =
      (localStorage.getItem("colorBlindMode") as "none" | "grayscale" | "deuteranopia" | "protanopia" | "tritanopia") ||
      "none"
    const savedContrastBoost = localStorage.getItem("contrastBoost") === "true"
    const savedZoom = (Number.parseInt(localStorage.getItem("pageZoom") || "100", 10) as 100 | 125 | 150) || 100
    const savedDyslexiaFont = localStorage.getItem("dyslexiaFont") === "true"
    const savedLineSpacing = (localStorage.getItem("lineSpacing") as "normal" | "relaxed" | "loose") || "normal"
    const savedLetterSpacing = (localStorage.getItem("letterSpacing") as "normal" | "wide" | "wider") || "normal"
    const savedFocusMode = localStorage.getItem("focusMode") === "true"
    const savedReadingGuide = localStorage.getItem("readingGuide") === "true"
    const savedSimplifiedLayout = localStorage.getItem("simplifiedLayout") === "true"
    const savedAnimationsReduced = localStorage.getItem("animationsReduced") === "true"

    setHighContrast(savedContrast)
    setFontSize(savedFontSize)
    setColorBlindMode(savedColorBlindMode)
    setContrastBoost(savedContrastBoost)
    setPageZoom(savedZoom)
    setDyslexiaFont(savedDyslexiaFont)
    setLineSpacing(savedLineSpacing)
    setLetterSpacing(savedLetterSpacing)
    setFocusMode(savedFocusMode)
    setReadingGuide(savedReadingGuide)
    setSimplifiedLayout(savedSimplifiedLayout)
    setAnimationsReduced(savedAnimationsReduced)
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

  useEffect(() => {
    if (dyslexiaFont) {
      document.documentElement.classList.add("dyslexia-font")
    } else {
      document.documentElement.classList.remove("dyslexia-font")
    }
    localStorage.setItem("dyslexiaFont", String(dyslexiaFont))
  }, [dyslexiaFont])

  useEffect(() => {
    document.documentElement.classList.remove("line-normal", "line-relaxed", "line-loose")
    document.documentElement.classList.add(`line-${lineSpacing}`)
    localStorage.setItem("lineSpacing", lineSpacing)
  }, [lineSpacing])

  useEffect(() => {
    document.documentElement.classList.remove("letter-normal", "letter-wide", "letter-wider")
    document.documentElement.classList.add(`letter-${letterSpacing}`)
    localStorage.setItem("letterSpacing", letterSpacing)
  }, [letterSpacing])

  useEffect(() => {
    if (focusMode) {
      document.documentElement.classList.add("focus-mode")
    } else {
      document.documentElement.classList.remove("focus-mode")
    }
    localStorage.setItem("focusMode", String(focusMode))
  }, [focusMode])

  useEffect(() => {
    if (readingGuide) {
      document.documentElement.classList.add("reading-guide")
    } else {
      document.documentElement.classList.remove("reading-guide")
    }
    localStorage.setItem("readingGuide", String(readingGuide))
  }, [readingGuide])

  useEffect(() => {
    if (simplifiedLayout) {
      document.documentElement.classList.add("simplified-layout")
    } else {
      document.documentElement.classList.remove("simplified-layout")
    }
    localStorage.setItem("simplifiedLayout", String(simplifiedLayout))
  }, [simplifiedLayout])

  useEffect(() => {
    if (animationsReduced) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
    localStorage.setItem("animationsReduced", String(animationsReduced))
  }, [animationsReduced])

  const toggleHighContrast = () => setHighContrast(!highContrast)
  const toggleContrastBoost = () => setContrastBoost((v) => !v)
  const toggleDyslexiaFont = () => setDyslexiaFont(!dyslexiaFont)
  const toggleFocusMode = () => setFocusMode(!focusMode)
  const toggleReadingGuide = () => setReadingGuide(!readingGuide)
  const toggleSimplifiedLayout = () => setSimplifiedLayout(!simplifiedLayout)
  const toggleAnimationsReduced = () => setAnimationsReduced(!animationsReduced)

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
        dyslexiaFont,
        toggleDyslexiaFont,
        lineSpacing,
        setLineSpacing,
        letterSpacing,
        setLetterSpacing,
        focusMode,
        toggleFocusMode,
        readingGuide,
        toggleReadingGuide,
        simplifiedLayout,
        toggleSimplifiedLayout,
        animationsReduced,
        toggleAnimationsReduced,
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
