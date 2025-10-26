"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Tag, ExternalLink, Volume2 } from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"
import Link from "next/link"
import { useState, useMemo } from "react"

export function News() {
  const { speak } = useAccessibility()

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

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

  const filteredNews = useMemo(() => {
    return newsItems.filter((news) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        categoryFilter === "all" ||
        (categoryFilter === "infrastructure" && news.category === "Infraestrutura") ||
        (categoryFilter === "health" && news.category === "Saúde") ||
        (categoryFilter === "education" && news.category === "Educação") ||
        (categoryFilter === "environment" && news.category === "Meio Ambiente") ||
        (categoryFilter === "work" && news.category === "Trabalho e Renda")

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter])

  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    speak("Filtros limpos")
  }

  const activeFiltersCount = [searchQuery !== "", categoryFilter !== "all"].filter(Boolean).length

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 px-2 sm:px-0">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Notícias e Avisos</h1>
        <p className="text-muted-foreground">Fique por dentro das novidades e comunicados da prefeitura</p>
      </section>

      <Card className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Tag className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Avisos Importantes</h3>
              <div className="space-y-2">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-center justify-between py-2 border-b border-white/20 last:border-0"
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
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <CardTitle className="text-lg sm:text-xl">Últimas Notícias</CardTitle>
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar notícias..."
                  className="pl-8 min-h-[44px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} ativo
                  {activeFiltersCount > 1 ? "s" : ""}
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
            <TabsList className="mb-6 w-full justify-start overflow-x-auto flex-nowrap">
              <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap min-h-[44px]">
                Todas ({newsItems.length})
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="text-xs sm:text-sm whitespace-nowrap min-h-[44px]">
                Infraestrutura ({newsItems.filter((n) => n.category === "Infraestrutura").length})
              </TabsTrigger>
              <TabsTrigger value="health" className="text-xs sm:text-sm whitespace-nowrap min-h-[44px]">
                Saúde ({newsItems.filter((n) => n.category === "Saúde").length})
              </TabsTrigger>
              <TabsTrigger value="education" className="text-xs sm:text-sm whitespace-nowrap min-h-[44px]">
                Educação ({newsItems.filter((n) => n.category === "Educação").length})
              </TabsTrigger>
              <TabsTrigger value="environment" className="text-xs sm:text-sm whitespace-nowrap min-h-[44px]">
                Meio Ambiente ({newsItems.filter((n) => n.category === "Meio Ambiente").length})
              </TabsTrigger>
              <TabsTrigger value="work" className="text-xs sm:text-sm whitespace-nowrap min-h-[44px]">
                Trabalho ({newsItems.filter((n) => n.category === "Trabalho e Renda").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={categoryFilter} className="space-y-4 sm:space-y-6">
              {filteredNews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Nenhuma notícia encontrada com os filtros aplicados.
                  </p>
                  {activeFiltersCount > 0 && (
                    <Button variant="link" onClick={clearFilters} className="mt-2">
                      Limpar filtros
                    </Button>
                  )}
                </div>
              ) : (
                filteredNews.map((news) => (
                  <Card key={news.id} className="hover:shadow-lg transition-shadow border-l-4 border-blue-700">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
                        <div className="relative h-48 md:h-full bg-muted rounded-t-lg md:rounded-l-lg overflow-hidden">
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
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
