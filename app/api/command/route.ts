import { NextRequest } from "next/server"

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function mapIntentFromText(text: string) {
  const t = normalize(text)

  const synonyms = {
    dashboard: ["painel", "inicio", "inicial", "home", "dashboard", "principal", "cidadao"],
    services: [
      "solicitacao",
      "solicitacoes",
      "servico",
      "servicos",
      "servicos publicos",
      "pedidos",
      "abrir solicitacoes",
      "aba de solicitacoes",
    ],
    appointments: ["agendamento", "agendamentos", "agenda", "compromissos", "marcar", "agendar"],
    news: ["noticia", "noticias", "novidades", "news", "informes"],
  } as const

  const score = (keys: string[]) => keys.reduce((acc, k) => (t.includes(k) ? acc + 1 : acc), 0)

  const scores = {
    dashboard: score(synonyms.dashboard),
    services: score(synonyms.services),
    appointments: score(synonyms.appointments),
    news: score(synonyms.news),
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const best = sorted.find(([, s]) => s > 0)?.[0] as keyof typeof scores | undefined

  if (best === "services") return { intent: "navigate" as const, page: "services" as const, feedback: "Abrindo a aba de Solicitações de Serviço." }
  if (best === "appointments") return { intent: "navigate" as const, page: "appointments" as const, feedback: "Abrindo a aba de Agendamentos." }
  if (best === "news") return { intent: "navigate" as const, page: "news" as const, feedback: "Abrindo a aba de Notícias." }
  if (best === "dashboard") return { intent: "navigate" as const, page: "dashboard" as const, feedback: "Abrindo o painel do cidadão." }

  return { intent: "unknown" as const, feedback: "Tente: 'ver painel', 'abrir solicitações', 'ir para agendamentos', 'mostrar notícias'." }
}

async function callExternalAI(text: string) {
  const endpoint = process.env.COMMAND_AI_ENDPOINT || "https://api.openai.com/v1/chat/completions"
  const apiKey = process.env.COMMAND_AI_KEY

  if (!apiKey) return null

  try {
    const body = {
      model: process.env.COMMAND_AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você interpreta comandos de navegação e responde somente com JSON no formato {intent:'navigate'|'unknown', page:'dashboard'|'services'|'appointments'|'news'|null, feedback:string}. Não inclua texto fora do JSON.",
        },
        { role: "user", content: text },
      ],
      temperature: 0,
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content || ""
    const match = content.match(/\{[\s\S]*\}/)
    if (!match) return null
    const parsed = JSON.parse(match[0])
    return parsed
  } catch (e) {
    return null
  }
}

export async function POST(req: NextRequest) {
  const { text } = await req.json()
  const aiResult = await callExternalAI(text)
  const result = aiResult || mapIntentFromText(text)

  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  })
}
