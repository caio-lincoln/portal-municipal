"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Bell, ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"

interface DashboardProps {
  onNavigate: (page: "services" | "appointments" | "news") => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { speak } = useAccessibility()

  const recentRequests = [
    { id: "2024-001", type: "Iluminação Pública", status: "Em Andamento", date: "15/01/2024" },
    { id: "2024-002", type: "Manutenção de Rua", status: "Concluído", date: "10/01/2024" },
    { id: "2024-003", type: "Coleta de Lixo", status: "Pendente", date: "20/01/2024" },
  ]

  const upcomingAppointments = [
    { id: "A001", service: "Atendimento - Secretaria de Saúde", date: "25/01/2024", time: "10:00" },
    { id: "A002", service: "Renovação de Documentos", date: "28/01/2024", time: "14:30" },
  ]

  const notifications = [
    {
      id: "N001",
      title: "Solicitação Atualizada",
      message: "Sua solicitação #2024-001 foi atualizada",
      time: "2h atrás",
    },
    {
      id: "N002",
      title: "Lembrete de Agendamento",
      message: "Você tem um agendamento amanhã às 10:00",
      time: "5h atrás",
    },
    {
      id: "N003",
      title: "Nova Notícia",
      message: "Prefeitura anuncia novo programa de pavimentação",
      time: "1 dia atrás",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Concluído":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "Em Andamento":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Pendente":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Concluído":
        return "default"
      case "Em Andamento":
        return "secondary"
      case "Pendente":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      <section className="mb-4 sm:mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2 tracking-tight">
          Portal do Cidadão
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-blue-700 px-2">
          Acompanhe indicadores, serviços e notícias da Prefeitura de Aracaju
        </p>
      </section>

      <section className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Cards informativos */}
        <Card className="hover:shadow-md transition-all border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Solicitações Ativas</CardTitle>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">2</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">1 concluída este mês</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all border-l-4 border-l-chart-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Próximos Agendamentos
            </CardTitle>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">2</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Próximo em 25/01/2024</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all border-l-4 border-l-chart-3 sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Notificações</CardTitle>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">3</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">2 não lidas</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Cards de solicitações e agendamentos */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div>
                <CardTitle className="text-lg sm:text-xl">Solicitações Recentes</CardTitle>
                <CardDescription className="mt-1 sm:mt-1.5 text-xs sm:text-sm">
                  Acompanhe o status das suas solicitações
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("services")}
                className="gap-2 self-start sm:self-auto"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors gap-2 sm:gap-4"
                  role="article"
                  aria-label={`Solicitação ${request.id} - ${request.type}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{request.type}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Protocolo: {request.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right ml-11 sm:ml-0">
                    <Badge variant={getStatusVariant(request.status)} className="mb-0 sm:mb-1.5 text-xs">
                      {request.status}
                    </Badge>
                    <p className="text-xs sm:text-sm text-muted-foreground">{request.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div>
                <CardTitle className="text-lg sm:text-xl">Próximos Agendamentos</CardTitle>
                <CardDescription className="mt-1 sm:mt-1.5 text-xs sm:text-sm">
                  Seus compromissos agendados
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("appointments")}
                className="gap-2 self-start sm:self-auto"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors gap-2 sm:gap-4"
                  role="article"
                  aria-label={`Agendamento ${appointment.service}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base">{appointment.service}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Código: {appointment.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right ml-11 sm:ml-0">
                    <p className="font-medium text-sm sm:text-base">{appointment.date}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
              ))}
              <Button
                className="w-full mt-2 bg-transparent text-sm sm:text-base"
                variant="outline"
                onClick={() => onNavigate("appointments")}
              >
                Novo Agendamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        {/* Card de notificações */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div>
                <CardTitle className="text-lg sm:text-xl">Notificações Recentes</CardTitle>
                <CardDescription className="mt-1 sm:mt-1.5 text-xs sm:text-sm">
                  Atualizações e lembretes importantes
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("news")}
                className="gap-2 self-start sm:self-auto"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors cursor-pointer"
                  role="article"
                  aria-label={notification.title}
                  onClick={() => speak(`${notification.title}. ${notification.message}`)}
                >
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium mb-1 text-sm sm:text-base">{notification.title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{notification.message}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
