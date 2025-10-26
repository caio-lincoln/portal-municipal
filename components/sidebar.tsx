"use client"

import { Home, FileText, Calendar, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/accessibility-provider"

interface SidebarProps {
  currentPage: "dashboard" | "services" | "appointments" | "news"
  onNavigate: (page: "dashboard" | "services" | "appointments" | "news") => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { iconsOnly } = useAccessibility()

  const menuItems = [
    { id: "dashboard" as const, label: "Início", icon: Home },
    { id: "services" as const, label: "Solicitações", icon: FileText },
    { id: "appointments" as const, label: "Agendamentos", icon: Calendar },
    { id: "news" as const, label: "Notícias", icon: Newspaper },
  ]

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        iconsOnly ? "w-20" : "w-72",
      )}
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between min-h-20">
        {!iconsOnly && <span className="text-sidebar-foreground font-semibold text-lg">Menu Principal</span>}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2" role="list">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-4 h-12 transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    iconsOnly && "justify-center",
                  )}
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={iconsOnly ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {!iconsOnly && <span className="font-medium">{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <div className={cn("text-sidebar-foreground", iconsOnly && "text-center")}>
          {!iconsOnly ? (
            <>
              <p className="text-sm font-semibold mb-0.5">Prefeitura de Aracaju</p>
              <p className="text-xs text-sidebar-foreground/60">Versão 1.0.0</p>
            </>
          ) : (
            <p className="text-xs font-bold">v1.0</p>
          )}
        </div>
      </div>
    </aside>
  )
}
