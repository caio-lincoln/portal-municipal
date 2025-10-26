"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, CheckCircle2, Clock, AlertCircle, MapPin } from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ServiceRequests() {
  const [showNewRequest, setShowNewRequest] = useState(false)
  const { speak } = useAccessibility()
  const [selectedRequest, setSelectedRequest] = useState<null | (typeof requests)[number]>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const requests = [
    {
      id: "2024-001",
      type: "Iluminação Pública",
      description: "Poste de luz queimado na Rua Santos Dumont",
      status: "Em Andamento",
      date: "15/01/2024",
      location: "Rua Santos Dumont, 123 - Centro",
      priority: "Alta",
    },
    {
      id: "2024-002",
      type: "Manutenção de Rua",
      description: "Buraco na via prejudicando o trânsito",
      status: "Concluído",
      date: "10/01/2024",
      location: "Av. Beira Mar, 456 - Atalaia",
      priority: "Média",
    },
    {
      id: "2024-003",
      type: "Coleta de Lixo",
      description: "Coleta não realizada há 3 dias",
      status: "Pendente",
      date: "20/01/2024",
      location: "Rua Laranjeiras, 789 - Siqueira Campos",
      priority: "Alta",
    },
    {
      id: "2024-004",
      type: "Poda de Árvore",
      description: "Árvore com galhos sobre a fiação elétrica",
      status: "Em Andamento",
      date: "18/01/2024",
      location: "Rua Itabaiana, 321 - São José",
      priority: "Média",
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

  const getPriorityVariant = (priority: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
      case "Alta":
        return "destructive"
      case "Média":
        return "secondary"
      case "Baixa":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            Solicitações de Serviço
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Abra novas solicitações e acompanhe o andamento</p>
        </div>
        <Button
          onClick={() => setShowNewRequest(!showNewRequest)}
          aria-label="Nova solicitação"
          className="w-full sm:w-auto min-h-[44px]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      {showNewRequest && (
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Nova Solicitação de Serviço</CardTitle>
            <CardDescription className="text-sm">
              Preencha os dados abaixo para abrir uma nova solicitação
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                speak("Solicitação enviada com sucesso")
                setShowNewRequest(false)
              }}
            >
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service-type" className="text-sm sm:text-base">
                    Tipo de Serviço
                  </Label>
                  <Select>
                    <SelectTrigger id="service-type" className="min-h-[44px]">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lighting">Iluminação Pública</SelectItem>
                      <SelectItem value="street">Manutenção de Rua</SelectItem>
                      <SelectItem value="garbage">Coleta de Lixo</SelectItem>
                      <SelectItem value="tree">Poda de Árvore</SelectItem>
                      <SelectItem value="cleaning">Limpeza Urbana</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm sm:text-base">
                    Prioridade
                  </Label>
                  <Select>
                    <SelectTrigger id="priority" className="min-h-[44px]">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm sm:text-base">
                  Localização
                </Label>
                <Input id="location" placeholder="Endereço completo do problema" className="min-h-[44px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm sm:text-base">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o problema encontrado"
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button type="submit" className="w-full sm:w-auto min-h-[44px]">
                  Enviar Solicitação
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewRequest(false)}
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <CardTitle className="text-lg sm:text-xl">Minhas Solicitações</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por protocolo..." className="pl-8 min-h-[44px]" />
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label="Filtrar"
                className="w-full sm:w-auto min-h-[44px] bg-transparent"
              >
                <Filter className="h-4 w-4" />
                <span className="sm:hidden ml-2">Filtrar</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-4 w-full justify-start overflow-x-auto flex-nowrap">
              <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap">
                Todas
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm whitespace-nowrap">
                Pendentes
              </TabsTrigger>
              <TabsTrigger value="progress" className="text-xs sm:text-sm whitespace-nowrap">
                Em Andamento
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm whitespace-nowrap">
                Concluídas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 sm:space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusIcon(request.status)}
                          <h3 className="font-semibold text-sm sm:text-base flex-1 min-w-0">{request.type}</h3>
                          <Badge variant={getPriorityVariant(request.priority)} className="text-xs">
                            {request.priority}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {request.description}
                        </p>
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="break-words">{request.location}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                          <span>Protocolo: {request.id}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Aberto em: {request.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0">
                        <Badge variant={getStatusVariant(request.status)} className="text-xs">
                          {request.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsDetailsOpen(true)
                          }}
                          className="min-h-[36px] text-xs sm:text-sm"
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Detalhes da Solicitação</DialogTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Informações completas da solicitação selecionada
                    </p>
                  </DialogHeader>
                  {selectedRequest && (
                    <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Protocolo</p>
                        <p className="font-medium text-sm sm:text-base">{selectedRequest.id}</p>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Tipo</p>
                        <p className="font-medium text-sm sm:text-base">{selectedRequest.type}</p>
                      </div>
                      <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Descrição</p>
                        <p className="font-medium text-sm sm:text-base">{selectedRequest.description}</p>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
                        <Badge variant={getStatusVariant(selectedRequest.status)} className="w-fit text-xs">
                          {selectedRequest.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Prioridade</p>
                        <Badge variant={getPriorityVariant(selectedRequest.priority)} className="w-fit text-xs">
                          {selectedRequest.priority}
                        </Badge>
                      </div>
                      <div className="space-y-1 sm:space-y-2 sm:col-span-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Localização</p>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <p className="font-medium text-sm sm:text-base break-words">{selectedRequest.location}</p>
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm text-muted-foreground">Abertura</p>
                        <p className="font-medium text-sm sm:text-base">{selectedRequest.date}</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      onClick={() => {
                        if (selectedRequest) {
                          speak(
                            `Solicitação ${selectedRequest.id}, ${selectedRequest.type}. Status ${selectedRequest.status}. Local ${selectedRequest.location}.`,
                          )
                        }
                      }}
                      className="w-full sm:w-auto min-h-[44px]"
                    >
                      Ler Detalhes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsDetailsOpen(false)}
                      className="w-full sm:w-auto min-h-[44px]"
                    >
                      Fechar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="pending">
              <p className="text-center text-sm sm:text-base text-muted-foreground py-6 sm:py-8">
                Filtrando solicitações pendentes...
              </p>
            </TabsContent>

            <TabsContent value="progress">
              <p className="text-center text-sm sm:text-base text-muted-foreground py-6 sm:py-8">
                Filtrando solicitações em andamento...
              </p>
            </TabsContent>

            <TabsContent value="completed">
              <p className="text-center text-sm sm:text-base text-muted-foreground py-6 sm:py-8">
                Filtrando solicitações concluídas...
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
