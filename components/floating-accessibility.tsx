"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAccessibility } from "@/components/accessibility-provider"
import { Accessibility, Contrast, ZoomIn, Type, Eye, Palette } from "lucide-react"

export function FloatingAccessibility() {
  const {
    highContrast,
    toggleHighContrast,
    contrastBoost,
    toggleContrastBoost,
    fontSize,
    setFontSize,
    pageZoom,
    setPageZoom,
    colorBlindMode,
    setColorBlindMode,
  } = useAccessibility()

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg"
            aria-label="Acessibilidade"
          >
            <Accessibility className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            Acessibilidade
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={toggleHighContrast} className="gap-2">
            <Contrast className="h-4 w-4" />
            <span>Alto contraste (tema escuro)</span>
            {highContrast && (
              <Badge className="ml-auto" variant="secondary">
                Ativo
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={toggleContrastBoost} className="gap-2">
            <Contrast className="h-4 w-4" />
            <span>Aumentar contraste</span>
            {contrastBoost && (
              <Badge className="ml-auto" variant="secondary">
                Ativo
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Tamanho da fonte</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setFontSize("normal")} className="gap-2">
            <Type className="h-4 w-4" />
            <span>Normal</span>
            {fontSize === "normal" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFontSize("large")} className="gap-2">
            <Type className="h-5 w-5" />
            <span>Grande</span>
            {fontSize === "large" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFontSize("xlarge")} className="gap-2">
            <Type className="h-6 w-6" />
            <span>Muito grande</span>
            {fontSize === "xlarge" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Zoom da página</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setPageZoom(100)} className="gap-2">
            <ZoomIn className="h-4 w-4" />
            <span>100%</span>
            {pageZoom === 100 && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPageZoom(125)} className="gap-2">
            <ZoomIn className="h-5 w-5" />
            <span>125%</span>
            {pageZoom === 125 && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPageZoom(150)} className="gap-2">
            <ZoomIn className="h-6 w-6" />
            <span>150%</span>
            {pageZoom === 150 && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">Modos para daltônicos</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setColorBlindMode("none")} className="gap-2">
            <Eye className="h-4 w-4" />
            <span>Nenhum</span>
            {colorBlindMode === "none" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorBlindMode("grayscale")} className="gap-2">
            <Palette className="h-4 w-4" />
            <span>Tons de cinza</span>
            {colorBlindMode === "grayscale" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorBlindMode("deuteranopia")} className="gap-2">
            <Palette className="h-4 w-4" />
            <span>Deuteranopia</span>
            {colorBlindMode === "deuteranopia" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorBlindMode("protanopia")} className="gap-2">
            <Palette className="h-4 w-4" />
            <span>Protanopia</span>
            {colorBlindMode === "protanopia" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorBlindMode("tritanopia")} className="gap-2">
            <Palette className="h-4 w-4" />
            <span>Tritanopia</span>
            {colorBlindMode === "tritanopia" && (
              <Badge className="ml-auto" variant="secondary">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}