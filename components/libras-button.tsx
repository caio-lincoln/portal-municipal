"use client"

import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react"
import { useEffect, useState } from "react"

export function LibrasButton() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkVLibras = setInterval(() => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.VLibras) {
        setIsLoaded(true)
        clearInterval(checkVLibras)
      }
    }, 100)

    return () => clearInterval(checkVLibras)
  }, [])

  const handleLibrasClick = () => {
    try {
      // Method 1: Try to click the VLibras access button
      const vlibrasButton = document.querySelector("[vw-access-button]") as HTMLElement
      if (vlibrasButton) {
        vlibrasButton.click()
        return
      }

      // Method 2: Try to find and click the VLibras plugin button
      const pluginButton = document.querySelector(".access-button") as HTMLElement
      if (pluginButton) {
        pluginButton.click()
        return
      }

      // Method 3: Try to toggle the plugin wrapper directly
      const pluginWrapper = document.querySelector("[vw-plugin-wrapper]") as HTMLElement
      if (pluginWrapper) {
        pluginWrapper.classList.toggle("active")
      }
    } catch (error) {
      console.error("[v0] Erro ao ativar VLibras:", error)
    }
  }

  return (
    <Button
      onClick={handleLibrasClick}
      size="lg"
      className="fixed bottom-[152px] right-4 sm:right-6 z-40 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all duration-300 hover:scale-110 border-2 border-purple-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Tradutor de LIBRAS"
      disabled={!isLoaded}
      title={isLoaded ? "Ativar tradutor de LIBRAS" : "Carregando tradutor..."}
    >
      <Hand className="h-6 w-6" />
    </Button>
  )
}
