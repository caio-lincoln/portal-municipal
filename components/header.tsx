"use client"

import { Bell, Home, FileText, Calendar, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAccessibility } from "@/components/accessibility-provider"

type NavPage = "dashboard" | "services" | "appointments" | "news"

export function Header({
  onMenuClick,
  currentPage,
  onNavigate,
}: {
  onMenuClick: () => void
  currentPage: NavPage
  onNavigate: (page: NavPage) => void
}) {
  const { speak } = useAccessibility()

  const navItems = [
    { id: "dashboard", label: "Início", icon: Home },
    { id: "services", label: "Solicitações", icon: FileText },
    { id: "appointments", label: "Agendamentos", icon: Calendar },
    { id: "news", label: "Notícias", icon: Newspaper },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b">
        <div className="flex items-center justify-between px-6 h-20 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="Logo.jpeg"
                  alt="Logo GuiaGov"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-blue-900">GuiaGov</h1>
                <span className="inline-block px-2 py-1 rounded bg-blue-50 text-xs font-semibold ml-2 text-blue-700">Portal do Cidadão</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-blue-700"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" />
              <Badge
                className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                3
              </Badge>
            </Button>
          </div>
        </div>
        <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 py-2 px-6">
          {/* Centraliza os botões do menu */}
          <div className="max-w-7xl mx-auto flex items-center gap-2 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 font-semibold text-base transition-all ${
                    isActive
                      ? "bg-white text-blue-700 shadow"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                  onClick={() => onNavigate(item.id as NavPage)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>
      </header>
    </>
  )
}
