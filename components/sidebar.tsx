"use client"

import { Home, FileText, Calendar, Newspaper, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarProps {
  currentPage: "dashboard" | "services" | "appointments" | "news"
  onNavigate: (page: "dashboard" | "services" | "appointments" | "news") => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard" as const, label: "Painel do Cidadão", icon: Home },
    { id: "services" as const, label: "Solicitações de Serviço", icon: FileText },
    { id: "appointments" as const, label: "Agendamentos", icon: Calendar },
    { id: "news" as const, label: "Notícias e Avisos", icon: Newspaper },
  ]

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-72",
      )}
      role="navigation"
      aria-label="Menu principal"
    >
      <div className="p-6 border-b border-sidebar-border flex items-center justify-between min-h-20">
        {!collapsed && <span className="text-sidebar-foreground font-semibold">Menu Principal</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent h-9 w-9"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
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
                    collapsed && "justify-center",
                  )}
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <div className={cn("text-sidebar-foreground", collapsed && "text-center")}>
          {!collapsed ? (
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
