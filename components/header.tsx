"use client"

import { Bell, HelpCircle, Settings, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAccessibility } from "@/components/accessibility-provider"

export function Header() {
  const { highContrast, toggleHighContrast, fontSize, setFontSize, speak } = useAccessibility()

  return (
    <header className="border-b bg-card/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm" role="banner">
      <div className="flex items-center justify-between px-6 lg:px-8 h-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-xl" aria-label="Logo da Prefeitura de Aracaju">
                AJU
              </span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-foreground tracking-tight">Portal da Prefeitura</h1>
              <p className="text-sm text-muted-foreground">Aracaju · Sergipe</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1" aria-label="Menu de navegação e configurações">
          <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Contato">
            <Phone className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Ajuda">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative h-10 w-10" aria-label="Notificações">
            <Bell className="h-5 w-5" />
            <Badge
              className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Configurações">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  )
}
