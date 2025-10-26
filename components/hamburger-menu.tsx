import { Home, FileText, Calendar, Newspaper, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HamburgerMenu({ open, onNavigate, currentPage }: {
  open: boolean
  onNavigate: (page: "dashboard" | "services" | "appointments" | "news") => void
  currentPage: "dashboard" | "services" | "appointments" | "news"
}) {
  const menuItems = [
    { id: "dashboard", label: "Painel do Cidadão", icon: Home },
    { id: "services", label: "Solicitações de Serviço", icon: FileText },
    { id: "appointments", label: "Agendamentos", icon: Calendar },
    { id: "news", label: "Notícias e Avisos", icon: Newspaper },
  ]
  return (
    <div className={cn(
      "fixed inset-0 z-40 bg-black/40 transition-opacity",
      open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <nav className={cn(
        "fixed top-0 right-0 h-full w-80 bg-white dark:bg-background shadow-xl flex flex-col p-6 transition-transform",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-primary">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => onNavigate(currentPage)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ul className="space-y-4">
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-4 h-14 rounded-xl text-lg font-semibold transition-all",
                    isActive && "bg-primary text-white shadow-lg"
                  )}
                  onClick={() => onNavigate(item.id as any)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Button>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
          <span>Prefeitura de Aracaju</span>
          <br />
          <span>Versão 1.0.0</span>
        </div>
      </nav>
    </div>
  )
}
