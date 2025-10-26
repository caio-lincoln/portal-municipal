"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Plus, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccessibility } from "@/components/accessibility-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Appointments() {
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const { speak } = useAccessibility()

  type Appointment = {
    id: string
    service: string
    department: string
    date: string
    time: string
    location: string
    status: string
  }

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

  // Helpers para formato de data
  const toInputDate = (displayDate: string) => {
    // de DD/MM/YYYY para YYYY-MM-DD
    const [d, m, y] = displayDate.split("/")
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
  }

  const formatDateDisplay = (inputDate: string) => {
    // de YYYY-MM-DD para DD/MM/YYYY
    const [y, m, d] = inputDate.split("-")
    return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`
  }

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [rescheduleDate, setRescheduleDate] = useState("")
  const [rescheduleTime, setRescheduleTime] = useState("")

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agendamentos</h1>
          <p className="text-muted-foreground">Agende atendimentos e consulte seus compromissos</p>
        </div>
        <Button onClick={() => setShowNewAppointment(!showNewAppointment)} aria-label="Novo agendamento">
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {showNewAppointment && (
        <Card className="border-l-4 border-blue-700">
          <CardHeader>
            <CardTitle>Novo Agendamento</CardTitle>
            <CardDescription>Selecione o serviço e escolha data e horário disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                speak("Agendamento realizado com sucesso")
                setShowNewAppointment(false)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="service">Serviço</Label>
                <Select>
                  <SelectTrigger id="service">
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

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Horário</Label>
                  <Select>
                    <SelectTrigger id="time">
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
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome completo" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" placeholder="000.000.000-00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(79) 00000-0000" />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Confirmar Agendamento</Button>
                {/* Botão Cancelar removido conforme solicitado */}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Seus compromissos confirmados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments
              .filter((apt) => apt.status === "Confirmado")
              .map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{appointment.service}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.department}</p>
                        </div>
                        <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsRescheduleOpen(true)
                            setRescheduleDate(toInputDate(appointment.date))
                            setRescheduleTime(appointment.time)
                          }}
                        >
                          Reagendar
                        </Button>
                        {/* Botão Cancelar removido conforme solicitado */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Agendamentos</CardTitle>
            <CardDescription>Agendamentos anteriores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments
              .filter((apt) => apt.status === "Concluído")
              .map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{appointment.service}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.department}</p>
                        </div>
                        <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Dialog de Reagendar */}
      <Dialog
        open={isRescheduleOpen}
        onOpenChange={(open) => {
          setIsRescheduleOpen(open)
          if (!open) setSelectedAppointment(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reagendar Agendamento</DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const newDateDisplay = formatDateDisplay(rescheduleDate)
                setAppointments((prev) =>
                  prev.map((apt) =>
                    apt.id === selectedAppointment.id
                      ? { ...apt, date: newDateDisplay, time: rescheduleTime }
                      : apt,
                  ),
                )
                speak(
                  `Agendamento ${selectedAppointment.id} reagendado para ${newDateDisplay} às ${rescheduleTime}`,
                )
                setIsRescheduleOpen(false)
                setSelectedAppointment(null)
              }}
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  {selectedAppointment.service} — {selectedAppointment.department}
                </p>
                <p className="text-sm">Atual: {selectedAppointment.date} às {selectedAppointment.time}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rescheduleDate">Nova Data</Label>
                  <Input
                    id="rescheduleDate"
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rescheduleTime">Novo Horário</Label>
                  <Select value={rescheduleTime} onValueChange={setRescheduleTime}>
                    <SelectTrigger id="rescheduleTime">
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

              <div className="flex gap-2">
                <Button type="submit">Confirmar Reagendamento</Button>
                <Button type="button" variant="outline" onClick={() => setIsRescheduleOpen(false)}>
                  Fechar
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Serviços Disponíveis</CardTitle>
          <CardDescription>Conheça os serviços que você pode agendar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableServices.map((service) => (
              <Card key={service.value} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{service.label}</h4>
                      <p className="text-xs text-muted-foreground">{service.department}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
