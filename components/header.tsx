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
        <div className="flex flex-col md:flex-row items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-0 md:h-20 max-w-7xl mx-auto w-full gap-3 md:gap-0">
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
                <img src="Logo.jpeg" alt="Logo GuiaGov" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-blue-900">GuiaGov</h1>
                <span className="inline-block px-2 py-0.5 sm:py-1 rounded bg-blue-50 text-[10px] sm:text-xs md:text-sm font-semibold ml-1 sm:ml-2 text-blue-700">
                  Portal do Cidadão
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="relative text-blue-700 md:hidden" aria-label="Notificações">
              <Bell className="h-5 w-5" />
              <Badge
                className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                3
              </Badge>
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-blue-700" aria-label="Notificações">
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
        <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 py-2 px-2 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 justify-start md:justify-center overflow-x-auto scrollbar-hide pb-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 md:px-5 py-2 font-semibold text-xs sm:text-sm md:text-base transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive ? "bg-white text-blue-700 shadow" : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                  onClick={() => onNavigate(item.id as NavPage)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline">{item.label}</span>
                </Button>
              )
            })}
          </div>
        </nav>
      </header>
    </>
  )
}
