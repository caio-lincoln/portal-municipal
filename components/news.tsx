"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Tag, ExternalLink, Volume2 } from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"
import Link from "next/link"
import { newsItems } from "@/lib/news"

export function News() {
  const { speak } = useAccessibility()

  const newsItems = [
    {
      id: "N001",
      title: "Prefeitura anuncia novo programa de pavimentação",
      category: "Infraestrutura",
      date: "23/01/2024",
      excerpt: "Serão investidos R$ 15 milhões na pavimentação de 50 ruas em diversos bairros da cidade.",
      content:
        "A Prefeitura de Aracaju anunciou hoje um novo programa de pavimentação que beneficiará mais de 20 bairros...",
      image: "/street-paving.jpg",
    },
    {
      id: "N002",
      title: "Campanha de vacinação contra a gripe começa na próxima semana",
      category: "Saúde",
      date: "22/01/2024",
      excerpt: "Postos de saúde estarão abertos em horário estendido para atender a população.",
      content: "A Secretaria Municipal de Saúde informa que a campanha de vacinação contra a gripe terá início...",
      image: "/vaccination-campaign.jpg",
    },
    {
      id: "N003",
      title: "Matrículas para a rede municipal de ensino estão abertas",
      category: "Educação",
      date: "20/01/2024",
      excerpt: "Pais e responsáveis podem realizar a matrícula online ou presencialmente até 15 de fevereiro.",
      content:
        "A Secretaria Municipal de Educação informa que as matrículas para o ano letivo de 2024 estão abertas...",
      image: "/school-enrollment.jpg",
    },
    {
      id: "N004",
      title: "Novo parque será inaugurado no bairro Jardins",
      category: "Meio Ambiente",
      date: "18/01/2024",
      excerpt: "Espaço contará com área de lazer, pista de caminhada e playground.",
      content: "A Prefeitura de Aracaju inaugura no próximo mês um novo parque no bairro Jardins...",
      image: "/city-park.png",
    },
    {
      id: "N005",
      title: "Programa de capacitação profissional oferece 500 vagas",
      category: "Trabalho e Renda",
      date: "15/01/2024",
      excerpt: "Cursos gratuitos em diversas áreas para qualificação da população.",
      content:
        "A Secretaria de Trabalho e Renda está com inscrições abertas para cursos de capacitação profissional...",
      image: "/professional-training.png",
    },
  ]

  const announcements = [
    {
      id: "A001",
      title: "Alteração no horário de atendimento durante o carnaval",
      date: "24/01/2024",
      type: "Aviso",
    },
    {
      id: "A002",
      title: "Manutenção programada no sistema de agendamentos",
      date: "23/01/2024",
      type: "Manutenção",
    },
    {
      id: "A003",
      title: "Prazo para pagamento de IPTU com desconto termina em 31/01",
      date: "20/01/2024",
      type: "Importante",
    },
  ]

  const getCategoryColor = (category: string): "default" | "secondary" | "destructive" | "outline" => {
    const colors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Infraestrutura: "default",
      Saúde: "secondary",
      Educação: "outline",
      "Meio Ambiente": "default",
      "Trabalho e Renda": "secondary",
    }
    return colors[category] || "default"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Notícias e Avisos</h1>
        <p className="text-muted-foreground">Fique por dentro das novidades e comunicados da prefeitura</p>
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-foreground/10 rounded-lg">
              <Tag className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Avisos Importantes</h3>
              <div className="space-y-2">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-center justify-between py-2 border-b border-primary-foreground/20 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-sm opacity-90">{announcement.date}</p>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      {announcement.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Últimas Notícias</CardTitle>
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar notícias..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="infrastructure">Infraestrutura</TabsTrigger>
              <TabsTrigger value="health">Saúde</TabsTrigger>
              <TabsTrigger value="education">Educação</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {newsItems.map((news) => (
                <Card key={news.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[200px_1fr] gap-4">
                      <div className="relative h-48 md:h-full bg-muted rounded-l-lg overflow-hidden">
                        <img
                          src={news.image || "/placeholder.svg"}
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={getCategoryColor(news.category)}>{news.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{news.date}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-balance">{news.title}</h3>
                        <p className="text-muted-foreground mb-4 text-pretty">{news.excerpt}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/noticias/${news.id}`} aria-label={`Ler mais sobre ${news.title}`}>
                              Ler mais
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speak(`${news.title}. ${news.excerpt}`)}
                            aria-label="Ouvir notícia"
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="infrastructure">
              <p className="text-center text-muted-foreground py-8">Filtrando notícias de infraestrutura...</p>
            </TabsContent>

            <TabsContent value="health">
              <p className="text-center text-muted-foreground py-8">Filtrando notícias de saúde...</p>
            </TabsContent>

            <TabsContent value="education">
              <p className="text-center text-muted-foreground py-8">Filtrando notícias de educação...</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
