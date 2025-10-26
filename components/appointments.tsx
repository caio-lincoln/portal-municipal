"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Plus, User, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccessibility } from "@/components/accessibility-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Appointment {
  id: string
  service: string
  department: string
  date: string
  time: string
  location: string
  status: string
}

export function Appointments() {
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const { speak } = useAccessibility()

  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilterValue, setStatusFilterValue] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "A001",
      service: "Atendimento - Secretaria de Saúde",
      department: "Secretaria de Saúde",
      date: "25/01/2024",
      time: "10:00",
      location: "Centro Administrativo - Sala 201",
      status: "Confirmado",
    },
    {
      id: "A002",
      service: "Renovação de Documentos",
      department: "Secretaria de Administração",
      date: "28/01/2024",
      time: "14:30",
      location: "Prefeitura - Térreo",
      status: "Confirmado",
    },
    {
      id: "A003",
      service: "Consulta - Assistência Social",
      department: "Secretaria de Assistência Social",
      date: "22/01/2024",
      time: "09:00",
      location: "CRAS - Bairro Industrial",
      status: "Concluído",
    },
  ])

  const availableServices = [
    { value: "health", label: "Atendimento - Secretaria de Saúde", department: "Secretaria de Saúde" },
    { value: "documents", label: "Renovação de Documentos", department: "Secretaria de Administração" },
    { value: "social", label: "Assistência Social", department: "Secretaria de Assistência Social" },
    { value: "education", label: "Matrícula Escolar", department: "Secretaria de Educação" },
    { value: "tax", label: "Atendimento Fiscal", department: "Secretaria de Finanças" },
  ]

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Date filter
      const matchesDate = dateFilter === "" || appointment.date.includes(dateFilter)

      // Status filter
      const matchesStatus = statusFilterValue === "all" || appointment.status === statusFilterValue

      return matchesSearch && matchesDate && matchesStatus
    })
  }, [appointments, searchQuery, dateFilter, statusFilterValue])

  const [rescheduleDialog, setRescheduleDialog] = useState<{
    open: boolean
    appointment: Appointment | null
    newDate: string
    newTime: string
  }>({
    open: false,
    appointment: null,
    newDate: "",
    newTime: "",
  })

  const handleReschedule = (appointment: Appointment) => {
    setRescheduleDialog({
      open: true,
      appointment,
      newDate: "",
      newTime: "",
    })
  }

  const confirmReschedule = () => {
    if (!rescheduleDialog.appointment || !rescheduleDialog.newDate || !rescheduleDialog.newTime) {
      speak("Por favor, selecione uma nova data e horário")
      return
    }

    // Convert date from YYYY-MM-DD to DD/MM/YYYY
    const [year, month, day] = rescheduleDialog.newDate.split("-")
    const formattedDate = `${day}/${month}/${year}`

    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === rescheduleDialog.appointment?.id
          ? { ...apt, date: formattedDate, time: rescheduleDialog.newTime }
          : apt,
      ),
    )

    speak(`Agendamento reagendado para ${formattedDate} às ${rescheduleDialog.newTime}`)
    setRescheduleDialog({ open: false, appointment: null, newDate: "", newTime: "" })
  }

  const [cancelDialog, setCancelDialog] = useState<{ open: boolean; appointment: Appointment | null }>({
    open: false,
    appointment: null,
  })

  const handleCancel = (appointment: Appointment) => {
    setCancelDialog({
      open: true,
      appointment,
    })
  }

  const confirmCancel = () => {
    if (!cancelDialog.appointment) return

    setAppointments((prev) =>
      prev.map((apt) => (apt.id === cancelDialog.appointment?.id ? { ...apt, status: "Cancelado" } : apt)),
    )

    speak("Agendamento cancelado com sucesso")
    setCancelDialog({ open: false, appointment: null })
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Confirmado":
        return "default"
      case "Concluído":
        return "secondary"
      case "Cancelado":
        return "destructive"
      default:
        return "outline"
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDateFilter("")
    setStatusFilterValue("all")
    speak("Filtros limpos")
  }

  const activeFiltersCount = [searchQuery !== "", dateFilter !== "", statusFilterValue !== "all"].filter(Boolean).length

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Agendamentos</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Agende atendimentos e consulte seus compromissos</p>
        </div>
        <Button
          onClick={() => setShowNewAppointment(!showNewAppointment)}
          aria-label="Novo agendamento"
          className="w-full sm:w-auto min-h-[44px]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg sm:text-xl">Filtrar Agendamentos</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="min-h-[40px]">
                {showFilters ? "Ocultar" : "Mostrar"} Filtros
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {showFilters && (
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 p-4 bg-muted/50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="search-appointments" className="text-sm">
                    Buscar
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-appointments"
                      placeholder="Serviço ou departamento..."
                      className="pl-8 min-h-[44px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-filter" className="text-sm">
                    Data
                  </Label>
                  <Input
                    id="date-filter"
                    type="date"
                    className="min-h-[44px]"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-filter-appointments" className="text-sm">
                    Status
                  </Label>
                  <Select value={statusFilterValue} onValueChange={setStatusFilterValue}>
                    <SelectTrigger id="status-filter-appointments" className="min-h-[44px]">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="Confirmado">Confirmado</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="sm:col-span-3">
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full sm:w-auto min-h-[40px]">
                      Limpar filtros ({activeFiltersCount})
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {showNewAppointment && (
        <Card className="border-l-4 border-blue-700">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Novo Agendamento</CardTitle>
            <CardDescription className="text-sm">
              Selecione o serviço e escolha data e horário disponíveis
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                speak("Agendamento realizado com sucesso")
                setShowNewAppointment(false)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm sm:text-base">
                  Serviço
                </Label>
                <Select>
                  <SelectTrigger id="service" className="min-h-[44px] text-base">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableServices.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm sm:text-base">
                    Data
                  </Label>
                  <Input id="date" type="date" className="min-h-[44px] text-base" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm sm:text-base">
                    Horário
                  </Label>
                  <Select>
                    <SelectTrigger id="time" className="min-h-[44px] text-base">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Nome Completo
                </Label>
                <Input id="name" placeholder="Seu nome completo" className="min-h-[44px] text-base" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm sm:text-base">
                  CPF
                </Label>
                <Input id="cpf" placeholder="000.000.000-00" className="min-h-[44px] text-base" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base">
                  Telefone
                </Label>
                <Input id="phone" placeholder="(79) 00000-0000" className="min-h-[44px] text-base" />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto min-h-[44px]">
                  Confirmar Agendamento
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewAppointment(false)}
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">
              Próximos Agendamentos ({filteredAppointments.filter((apt) => apt.status === "Confirmado").length})
            </CardTitle>
            <CardDescription className="text-sm">Seus compromissos confirmados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            {filteredAppointments.filter((apt) => apt.status === "Confirmado").length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">
                Nenhum agendamento confirmado encontrado.
              </p>
            ) : (
              filteredAppointments
                .filter((apt) => apt.status === "Confirmado")
                .map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{appointment.service}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {appointment.department}
                            </p>
                          </div>
                          <Badge variant={getStatusVariant(appointment.status)} className="shrink-0 text-xs">
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 shrink-0" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="break-words">{appointment.location}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:flex-1 bg-transparent min-h-[40px]"
                            onClick={() => handleReschedule(appointment)}
                          >
                            Reagendar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:flex-1 bg-transparent min-h-[40px]"
                            onClick={() => handleCancel(appointment)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">
              Histórico de Agendamentos (
              {filteredAppointments.filter((apt) => apt.status === "Concluído" || apt.status === "Cancelado").length})
            </CardTitle>
            <CardDescription className="text-sm">Agendamentos anteriores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            {filteredAppointments.filter((apt) => apt.status === "Concluído" || apt.status === "Cancelado").length ===
            0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">Nenhum histórico encontrado.</p>
            ) : (
              filteredAppointments
                .filter((apt) => apt.status === "Concluído" || apt.status === "Cancelado")
                .map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 sm:p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{appointment.service}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {appointment.department}
                            </p>
                          </div>
                          <Badge variant={getStatusVariant(appointment.status)} className="shrink-0 text-xs">
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 shrink-0" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Serviços Disponíveis</CardTitle>
          <CardDescription className="text-sm">Conheça os serviços que você pode agendar</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {availableServices.map((service) => (
              <Card key={service.value} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs sm:text-sm mb-1 break-words">{service.label}</h4>
                      <p className="text-xs text-muted-foreground break-words">{service.department}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={rescheduleDialog.open} onOpenChange={(open) => setRescheduleDialog({ ...rescheduleDialog, open })}>
        <DialogContent className="sm:max-w-[425px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>Reagendar Agendamento</DialogTitle>
            <DialogDescription>Selecione uma nova data e horário para o agendamento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reschedule-service" className="text-sm">
                Serviço
              </Label>
              <Input
                id="reschedule-service"
                value={rescheduleDialog.appointment?.service || ""}
                disabled
                className="min-h-[44px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reschedule-date" className="text-sm">
                Nova Data
              </Label>
              <Input
                id="reschedule-date"
                type="date"
                value={rescheduleDialog.newDate}
                onChange={(e) => setRescheduleDialog({ ...rescheduleDialog, newDate: e.target.value })}
                className="min-h-[44px] text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reschedule-time" className="text-sm">
                Novo Horário
              </Label>
              <Select
                value={rescheduleDialog.newTime}
                onValueChange={(value) => setRescheduleDialog({ ...rescheduleDialog, newTime: value })}
              >
                <SelectTrigger id="reschedule-time" className="min-h-[44px] text-base">
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setRescheduleDialog({ open: false, appointment: null, newDate: "", newTime: "" })}
              className="w-full sm:w-auto min-h-[44px]"
            >
              Cancelar
            </Button>
            <Button onClick={confirmReschedule} className="w-full sm:w-auto min-h-[44px]">
              Confirmar Reagendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cancelDialog.open} onOpenChange={(open) => setCancelDialog({ ...cancelDialog, open })}>
        <DialogContent className="sm:max-w-[425px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle>Cancelar Agendamento</DialogTitle>
            <DialogDescription>Tem certeza que deseja cancelar este agendamento?</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">{cancelDialog.appointment?.service}</p>
              <p className="text-sm text-muted-foreground">{cancelDialog.appointment?.department}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>{cancelDialog.appointment?.date}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{cancelDialog.appointment?.time}</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setCancelDialog({ open: false, appointment: null })}
              className="w-full sm:w-auto min-h-[44px]"
            >
              Não, manter agendamento
            </Button>
            <Button variant="destructive" onClick={confirmCancel} className="w-full sm:w-auto min-h-[44px]">
              Sim, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
