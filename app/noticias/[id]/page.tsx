import { notFound } from "next/navigation"
import type { Metadata } from "next"
import NewsDetailPageClient from "./NewsDetailPageClient"
import { getNewsById } from "@/lib/news"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const news = getNewsById(params.id)
  if (!news) {
    return { title: "Notícia não encontrada" }
  }
  return {
    title: `${news.title} | Portal GuiaGov Aracaju`,
    description: news.excerpt,
  }
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const news = getNewsById(params.id)
  if (!news) {
    notFound()
  }

  return <NewsDetailPageClient news={news} />
}
