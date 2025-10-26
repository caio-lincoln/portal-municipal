"use client"

import { useState } from "react"
import { Bell, Check, X, Trash2, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAccessibility } from "@/components/accessibility-provider"

type NotificationType = "info" | "success" | "warning" | "error"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Solicitação Aprovada",
    message: "Sua solicitação de reparo de iluminação pública foi aprovada e está em andamento.",
    time: "Há 5 minutos",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Novo Agendamento",
    message: "Seu agendamento para atendimento na Secretaria de Saúde foi confirmado para 15/01/2025.",
    time: "Há 1 hora",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Documento Pendente",
    message: "Falta enviar documentos para completar sua solicitação de alvará.",
    time: "Há 2 horas",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "Nova Notícia Publicada",
    message: "Confira as últimas atualizações sobre obras de infraestrutura na cidade.",
    time: "Há 3 horas",
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Pagamento Confirmado",
    message: "O pagamento da taxa de serviço foi confirmado com sucesso.",
    time: "Ontem",
    read: true,
  },
]

const notificationIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const notificationColors = {
  info: "text-blue-600 bg-blue-50",
  success: "text-green-600 bg-green-50",
  warning: "text-amber-600 bg-amber-50",
  error: "text-red-600 bg-red-50",
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [open, setOpen] = useState(false)
  const { speak } = useAccessibility()

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    speak("Notificação marcada como lida")
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    speak("Todas as notificações foram marcadas como lidas")
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    speak("Notificação removida")
  }

  const clearAll = () => {
    setNotifications([])
    speak("Todas as notificações foram removidas")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-blue-700 hover:bg-blue-50"
          aria-label={`Notificações${unreadCount > 0 ? `, ${unreadCount} não lidas` : ""}`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] sm:w-96 p-0" align="end" sideOffset={8}>
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold text-base sm:text-lg">Notificações</h3>
            {unreadCount > 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground">
                {unreadCount} não {unreadCount === 1 ? "lida" : "lidas"}
              </p>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="flex gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs h-8"
                  aria-label="Marcar todas como lidas"
                >
                  <Check className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Marcar todas</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                aria-label="Limpar todas"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground text-center">Nenhuma notificação</p>
          </div>
        ) : (
          <ScrollArea className="h-[60vh] sm:h-96">
            <div className="p-2">
              {notifications.map((notification, index) => {
                const Icon = notificationIcons[notification.type]
                const colorClass = notificationColors[notification.type]

                return (
                  <div key={notification.id}>
                    <div
                      className={`group relative p-3 rounded-lg hover:bg-accent transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4
                              className={`text-sm font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div
                                className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1"
                                aria-label="Não lida"
                              />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-7 px-2 text-xs"
                                  aria-label="Marcar como lida"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                                aria-label="Remover notificação"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < notifications.length - 1 && <Separator className="my-1" />}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  )
}
