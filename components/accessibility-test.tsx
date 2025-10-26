"use client"

import { useAccessibility } from "./accessibility-provider"
import { useEffect } from "react"

export function AccessibilityTest() {
  const accessibility = useAccessibility()

  useEffect(() => {
    console.log("[v0] Accessibility settings loaded:", {
      highContrast: accessibility.highContrast,
      fontSize: accessibility.fontSize,
      colorBlindMode: accessibility.colorBlindMode,
      dyslexiaFont: accessibility.dyslexiaFont,
      iconsOnly: accessibility.iconsOnly,
    })
  }, [accessibility])

  return null
}
