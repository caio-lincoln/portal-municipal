"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/components/accessibility-provider"

type Page = "dashboard" | "services" | "appointments" | "news"

interface CommandChatProps {
  onNavigate: (page: Page) => void
}

export function CommandChat({ onNavigate }: CommandChatProps) {
  const [command, setCommand] = useState("")
  const [feedback, setFeedback] = useState<string>("")
  const { speak } = useAccessibility()

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

  const localParse = (text: string) => {
    const t = normalize(text)

    const synonyms: Record<Page, string[]> = {
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
    }

    const scores: Partial<Record<Page, number>> = {}
    ;(Object.keys(synonyms) as Page[]).forEach((page) => {
      scores[page] = synonyms[page].reduce((acc, s) => (t.includes(s) ? acc + 1 : acc), 0)
    })

    const best = (Object.entries(scores) as [Page, number][]) // type cast for TS
      .sort((a, b) => b[1] - a[1])
      .find(([, score]) => score > 0)

    return best ? best[0] : null
  }

  const parseSearchQuery = (text: string) => {
    const t = normalize(text)
    const verbs = ["buscar", "procurar", "pesquisar", "encontrar", "achar"]
    for (const v of verbs) {
      const idx = t.indexOf(v)
      if (idx === 0) {
        const q = t.slice(v.length).trim()
        if (q) return q
      }
    }
    // Also support patterns like "buscar noticias de saude" or "procurar vacina"
    const keywords = ["noticia", "noticias", "servico", "servicos", "agendamento", "agenda", "painel"]
    if (verbs.some((v) => t.includes(v))) {
      // use the whole text minus verb
      for (const v of verbs) {
        if (t.includes(v)) {
          const q = t.replace(v, "").trim()
          if (q) return q
        }
      }
    }
    return null
  }

  const handleExecute = async () => {
    const text = command.trim()
    setCommand("")

    try {
      const res = await fetch("/api/command", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (data?.intent === "navigate" && data?.page) {
        onNavigate(data.page)
        const msg = data?.feedback || "Executando navegação solicitada."
        setFeedback(msg)
        speak(msg)
        return
      }
    } catch (e) {
      // ignore and fallback
    }

    // Try search intent
    const searchQuery = parseSearchQuery(text)
    if (searchQuery) {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        const data = await res.json()
        const results: Array<{ title: string; route: string }> = data?.results || []

        if (results.length > 0) {
          const top = results.slice(0, 3)
          const summary = top.map((r) => `• ${r.title}`).join("\n")
          const msg = `Encontrei ${results.length} resultado(s) para "${searchQuery}".\n${summary}`
          setFeedback(msg)
          speak(`Encontrei ${results.length} resultados. Mostrando principais.`)
          return
        } else {
          const msg = `Não encontrei resultados para "${searchQuery}".`
          setFeedback(msg)
          speak(msg)
          return
        }
      } catch {
        const msg = `Houve um problema ao buscar por "${searchQuery}".`
        setFeedback(msg)
        speak(msg)
        return
      }
    }

    const target = localParse(text)
    if (target) {
      onNavigate(target)
      const msg =
        target === "services"
          ? "Abrindo a aba de Solicitações de Serviço."
          : target === "appointments"
          ? "Abrindo a aba de Agendamentos."
          : target === "news"
          ? "Abrindo a aba de Notícias."
          : "Abrindo o painel do cidadão."
      setFeedback(msg)
      speak(msg)
    } else {
      const msg = "Entendi que você quer navegar, mas não identifiquei o destino. Tente: 'ver painel', 'abrir solicitações', 'ir para agendamentos', 'mostrar notícias'."
      setFeedback(msg)
      speak(msg)
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[min(28rem,90vw)]">
      <Card role="region" aria-label="Chatbot de comandos">
        <CardContent className="p-3 space-y-2">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Digite um comando, ex.: ver painel, abrir solicitações"
              aria-label="Campo de comando do chatbot"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleExecute()
                }
              }}
            />
            <Button onClick={handleExecute} aria-label="Executar comando">Enviar</Button>
          </div>
          {feedback && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {feedback}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}