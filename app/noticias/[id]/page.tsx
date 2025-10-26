import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Tag } from "lucide-react"
import Link from "next/link"
import { getNewsById } from "@/lib/news"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const news = getNewsById(params.id)
  if (!news) {
    return { title: "Notícia não encontrada" }
  }
  return {
    title: `Notícia: ${news.title}`,
    description: news.excerpt,
  }
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const news = getNewsById(params.id)
  if (!news) {
    notFound()
  }

  const categoryColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Infraestrutura: "default",
    Saúde: "secondary",
    Educação: "outline",
    "Meio Ambiente": "default",
    "Trabalho e Renda": "secondary",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{news.title}</h1>
        <Link href="/noticias" className="text-sm underline underline-offset-4">← Todas as notícias</Link>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={categoryColors[news.category] || "default"}>{news.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{news.date}</span>
            </div>
          </div>
          <CardTitle className="text-xl">Resumo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{news.excerpt}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-lg">
              <Tag className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Conteúdo</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <p>{news.content}</p>
          </div>
          {news.image && (
            <div className="mt-6 rounded-lg overflow-hidden border">
              <img src={news.image} alt={news.title} className="w-full h-[320px] object-cover" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}