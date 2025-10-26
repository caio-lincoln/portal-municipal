"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Tag, User, ArrowLeft, Share2, Volume2, Clock } from "lucide-react"
import Link from "next/link"
import { getRelatedNews } from "@/lib/news"

interface NewsDetailPageClientProps {
  news: {
    id: string
    title: string
    excerpt: string
    fullContent?: string[]
    content: string
    category: string
    tags?: string[]
    date: string
    author?: string
    image?: string
  }
}

export default function NewsDetailPageClient({ news }: NewsDetailPageClientProps) {
  const relatedNews = getRelatedNews(news.id, news.category)

  const categoryColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Infraestrutura: "default",
    Saúde: "secondary",
    Educação: "outline",
    "Meio Ambiente": "default",
    "Trabalho e Renda": "secondary",
  }

  const readArticle = () => {
    if ("speechSynthesis" in window) {
      const text = `${news.title}. ${news.fullContent?.join(" ") || news.content}`
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "pt-BR"
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href="/noticias" className="hover:text-foreground transition-colors">
              Notícias
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{news.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/noticias">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para notícias
            </Link>
          </Button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={categoryColors[news.category] || "default"} className="text-sm">
                {news.category}
              </Badge>
              {news.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance leading-tight">{news.title}</h1>

            <p className="text-lg sm:text-xl text-muted-foreground text-pretty">{news.excerpt}</p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{news.date}</span>
              </div>
              {news.author && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>{news.author}</span>
                  </div>
                </>
              )}
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil((news.fullContent?.join(" ").split(" ").length || 200) / 200)} min de leitura</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={readArticle}>
                <Volume2 className="mr-2 h-4 w-4" />
                Ouvir notícia
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>

          <Separator />

          {/* Featured Image */}
          {news.image && (
            <Card className="overflow-hidden">
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </Card>
          )}

          {/* Article Content */}
          <Card>
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <article className="prose prose-slate prose-lg max-w-none">
                {news.fullContent ? (
                  news.fullContent.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-pretty leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-pretty leading-relaxed">{news.content}</p>
                )}
              </article>
            </CardContent>
          </Card>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Notícias Relacionadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedNews.map((related) => (
                    <Link key={related.id} href={`/noticias/${related.id}`} className="group block">
                      <Card className="h-full hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          {related.image && (
                            <div className="relative h-32 mb-3 rounded-md overflow-hidden bg-muted">
                              <img
                                src={related.image || "/placeholder.svg"}
                                alt={related.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <Badge variant={categoryColors[related.category] || "default"} className="mb-2 text-xs">
                            {related.category}
                          </Badge>
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
