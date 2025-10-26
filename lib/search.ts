import { newsItems } from "@/lib/news"

export type SearchItem = {
  id: string
  title: string
  route: string
  excerpt?: string
  content?: string
  category?: string
  tags?: string[]
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function tokenize(text: string) {
  return normalize(text).split(" ").filter(Boolean)
}

export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = []

  // Pages (static summaries)
  items.push(
    {
      id: "page-dashboard",
      title: "Painel do Cidadão",
      route: "/",
      excerpt: "Indicadores municipais, serviços rápidos e notícias em destaque.",
      content:
        "Painel com indicadores municipais, atalhos para solicitações, compromissos e acesso rápido às notícias e notificações.",
      tags: ["painel", "inicio", "dashboard", "principal"],
      category: "Portal",
    },
    {
      id: "page-services",
      title: "Solicitações de Serviço",
      route: "/",
      excerpt: "Acompanhe e crie solicitações de serviços públicos.",
      content:
        "Solicitações de serviços públicos: protocolo, status, prioridade e detalhes de atendimento. Formulário para abrir novas solicitações.",
      tags: ["servicos", "solicitacoes", "protocolo", "atendimento"],
      category: "Serviços",
    },
    {
      id: "page-appointments",
      title: "Agendamentos",
      route: "/",
      excerpt: "Gerencie compromissos e atendimentos agendados.",
      content:
        "Agendamentos de serviços: datas, horários, locais e status. Possibilidade de reagendamento e consulta de serviços disponíveis.",
      tags: ["agendamentos", "agenda", "compromissos", "servicos"],
      category: "Serviços",
    },
    {
      id: "page-news",
      title: "Notícias",
      route: "/noticias",
      excerpt: "Informes e novidades da Prefeitura.",
      content:
        "Notícias e comunicados oficiais da Prefeitura: campanhas de vacinação, obras de infraestrutura, educação, meio ambiente e programas de trabalho e renda.",
      tags: ["noticias", "novidades", "informes"],
      category: "Comunicação",
    },
  )

  // News items
  for (const n of newsItems) {
    items.push({
      id: `news-${n.id}`,
      title: n.title,
      route: `/noticias/${n.id}`,
      excerpt: n.excerpt,
      content: n.content,
      tags: [n.category],
      category: n.category,
    })
  }

  return items
}

export function search(query: string, limit = 10) {
  const qTokens = tokenize(query)
  if (qTokens.length === 0) return []

  const items = getSearchIndex()

  const scored = items.map((item) => {
    const textTitle = normalize(item.title)
    const textContent = normalize(`${item.excerpt || ""} ${item.content || ""}`)
    const textTags = normalize(`${(item.tags || []).join(" ")}`)
    const textCategory = normalize(item.category || "")

    let score = 0
    for (const t of qTokens) {
      if (textTitle.includes(t)) score += 3
      if (textTags.includes(t)) score += 2
      if (textCategory.includes(t)) score += 2
      if (textContent.includes(t)) score += 1
    }

    // Boost exact title match
    const qNorm = normalize(query)
    if (textTitle === qNorm) score += 5

    return { item, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item)
}