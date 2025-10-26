"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Volume2, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAccessibility } from "@/components/accessibility-provider"
import { Card } from "@/components/ui/card"

type Page = "dashboard" | "services" | "appointments" | "news" | "departments"

interface VoiceChatModalProps {
  onNavigate: (page: Page) => void
}

export function VoiceChatModal({ onNavigate }: VoiceChatModalProps) {
  const [open, setOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { speak } = useAccessibility()
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "pt-BR"

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcriptText = event.results[current][0].transcript
        setTranscript(transcriptText)

        if (event.results[current].isFinal) {
          handleCommand(transcriptText)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        setFeedback("Erro ao reconhecer voz. Tente novamente.")
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("")
      setFeedback("")
      setIsListening(true)
      recognitionRef.current.start()
    } else {
      setFeedback("Reconhecimento de voz não disponível neste navegador.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

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
      departments: [
        "orgao",
        "orgaos",
        "departamento",
        "departamentos",
        "responsavel",
        "responsaveis",
        "quem resolve",
        "contato",
        "telefone",
        "endereco",
      ],
    }

    const scores: Partial<Record<Page, number>> = {}
    ;(Object.keys(synonyms) as Page[]).forEach((page) => {
      scores[page] = synonyms[page].reduce((acc, s) => (t.includes(s) ? acc + 1 : acc), 0)
    })

    const best = (Object.entries(scores) as [Page, number][]).sort((a, b) => b[1] - a[1]).find(([, score]) => score > 0)

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
    if (verbs.some((v) => t.includes(v))) {
      for (const v of verbs) {
        if (t.includes(v)) {
          const q = t.replace(v, "").trim()
          if (q) return q
        }
      }
    }
    return null
  }

  const handleCommand = async (text: string) => {
    setIsProcessing(true)

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
        setIsProcessing(false)
        return
      }
    } catch (e) {
      // fallback to local parsing
    }

    const searchQuery = parseSearchQuery(text)
    if (searchQuery) {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        const data = await res.json()
        const results: Array<{ title: string; route: string }> = data?.results || []

        if (results.length > 0) {
          const top = results.slice(0, 3)
          const summary = top.map((r) => `${r.title}`).join(", ")
          const msg = `Encontrei ${results.length} resultado(s): ${summary}`
          setFeedback(msg)
          speak(`Encontrei ${results.length} resultados. ${summary}`)
          setIsProcessing(false)
          return
        } else {
          const msg = `Não encontrei resultados para "${searchQuery}".`
          setFeedback(msg)
          speak(msg)
          setIsProcessing(false)
          return
        }
      } catch {
        const msg = `Houve um problema ao buscar por "${searchQuery}".`
        setFeedback(msg)
        speak(msg)
        setIsProcessing(false)
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
              : target === "departments"
                ? "Abrindo a página de Órgãos Responsáveis."
                : "Abrindo o painel do cidadão."
      setFeedback(msg)
      speak(msg)
    } else {
      const msg =
        "Não consegui entender o comando. Tente dizer: 'ver painel', 'abrir solicitações', 'mostrar notícias' ou 'ver órgãos responsáveis'."
      setFeedback(msg)
      speak(msg)
    }

    setIsProcessing(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-[104px] right-4 sm:right-6 z-40 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 hover:scale-110 border-2 border-blue-400/30"
          aria-label="Abrir chat por voz"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            Assistente por Voz
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Fale comandos como "ver painel", "abrir solicitações" ou "mostrar notícias"
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Voice Visualization */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div
                className={`relative h-32 w-32 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? "bg-blue-600 animate-pulse shadow-2xl shadow-blue-500/50"
                    : "bg-blue-600/20 hover:bg-blue-600/30"
                }`}
              >
                {isListening ? (
                  <Mic className="h-16 w-16 text-white" />
                ) : (
                  <MicOff className="h-16 w-16 text-blue-600" />
                )}
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20" />
                    <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20 animation-delay-150" />
                  </>
                )}
              </div>

              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {isListening ? "Escutando..." : isProcessing ? "Processando..." : "Pronto para ouvir"}
                </p>
                {transcript && <p className="text-sm text-muted-foreground italic">"{transcript}"</p>}
              </div>
            </div>
          </Card>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            {!isListening ? (
              <Button
                size="lg"
                onClick={startListening}
                disabled={isProcessing}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Começar a Falar
                  </>
                )}
              </Button>
            ) : (
              <Button size="lg" onClick={stopListening} variant="destructive" className="gap-2">
                <MicOff className="h-5 w-5" />
                Parar
              </Button>
            )}
          </div>

          {/* Feedback */}
          {feedback && (
            <Card className="p-4 bg-muted/50">
              <div className="flex items-start gap-3">
                <Volume2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm leading-relaxed" aria-live="polite">
                  {feedback}
                </p>
              </div>
            </Card>
          )}

          {/* Examples */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Exemplos de comandos:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Ver painel",
                "Abrir solicitações",
                "Ir para agendamentos",
                "Mostrar notícias",
                "Ver órgãos",
                "Quem resolve",
              ].map((example) => (
                <Button
                  key={example}
                  variant="outline"
                  size="sm"
                  onClick={() => handleCommand(example)}
                  disabled={isListening || isProcessing}
                  className="justify-start text-left h-auto py-2"
                >
                  <span className="text-xs">"{example}"</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
