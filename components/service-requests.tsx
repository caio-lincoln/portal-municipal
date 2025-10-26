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
import { Drawer } from "vaul"

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
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Solicitações de Serviço</h1>
          <p className="text-muted-foreground">Abra novas solicitações e acompanhe o andamento</p>
        </div>
        <Button onClick={() => setShowNewRequest(!showNewRequest)} aria-label="Nova solicitação">
          <Plus className="mr-2 h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      {showNewRequest && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Solicitação de Serviço</CardTitle>
            <CardDescription>Preencha os dados abaixo para abrir uma nova solicitação</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                speak("Solicitação enviada com sucesso")
                setShowNewRequest(false)
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Tipo de Serviço</Label>
                  <Select>
                    <SelectTrigger id="service-type">
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
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select>
                    <SelectTrigger id="priority">
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
                <Label htmlFor="location">Localização</Label>
                <Input id="location" placeholder="Endereço completo do problema" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descreva detalhadamente o problema encontrado" rows={4} />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Enviar Solicitação</Button>
                <Button type="button" variant="outline" onClick={() => setShowNewRequest(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Minhas Solicitações</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por protocolo..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon" aria-label="Filtrar">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="progress">Em Andamento</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <h3 className="font-semibold">{request.type}</h3>
                          <Badge variant={getPriorityVariant(request.priority)} className="ml-auto md:ml-0">
                            {request.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{request.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Protocolo: {request.id}</span>
                          <span>•</span>
                          <span>Aberto em: {request.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsDetailsOpen(true)
                          }}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Drawer de detalhes */}
              <Drawer.Root open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 mx-auto max-w-3xl rounded-t-2xl border bg-card shadow-lg">
                    <div className="p-4">
                      <div className="mx-auto w-12 h-1.5 rounded-full bg-muted" aria-hidden />
                    </div>
                    <div className="px-6 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <Drawer.Title className="text-xl font-semibold">Detalhes da Solicitação</Drawer.Title>
                          <Drawer.Description className="text-sm text-muted-foreground">Informações completas da solicitação selecionada</Drawer.Description>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(false)} aria-label="Fechar">
                          Fechar
                        </Button>
                      </div>

                      {selectedRequest && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Protocolo</p>
                            <p className="font-medium">{selectedRequest.id}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Tipo</p>
                            <p className="font-medium">{selectedRequest.type}</p>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <p className="text-sm text-muted-foreground">Descrição</p>
                            <p className="font-medium">{selectedRequest.description}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <Badge variant={getStatusVariant(selectedRequest.status)} className="w-fit">
                              {selectedRequest.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Prioridade</p>
                            <Badge variant={getPriorityVariant(selectedRequest.priority)} className="w-fit">
                              {selectedRequest.priority}
                            </Badge>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <p className="text-sm text-muted-foreground">Localização</p>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <p className="font-medium">{selectedRequest.location}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Abertura</p>
                            <p className="font-medium">{selectedRequest.date}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-8 flex gap-2">
                        <Button
                          onClick={() => {
                            if (selectedRequest) {
                              speak(
                                `Solicitação ${selectedRequest.id}, ${selectedRequest.type}. Status ${selectedRequest.status}. Local ${selectedRequest.location}.`,
                              )
                            }
                          }}
                        >
                          Ler Detalhes
                        </Button>
                        <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                          Fechar
                        </Button>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </TabsContent>

            <TabsContent value="pending">
              <p className="text-center text-muted-foreground py-8">Filtrando solicitações pendentes...</p>
            </TabsContent>

            <TabsContent value="progress">
              <p className="text-center text-muted-foreground py-8">Filtrando solicitações em andamento...</p>
            </TabsContent>

            <TabsContent value="completed">
              <p className="text-center text-muted-foreground py-8">Filtrando solicitações concluídas...</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
