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

  const handleExecute = () => {
    const text = command.trim().toLowerCase()

    const gotoDashboard = /\b(início|home|dashboard|principal)\b/.test(text)
    const gotoServices = /\b(solicita[cç][oõ]es|servi[cç]os|aba de solicita[cç][oõ]es|abrir solicita[cç][oõ]es)\b/.test(text)
    const gotoAppointments = /\b(agendamentos|agenda|compromissos|aba de agendamentos)\b/.test(text)
    const gotoNews = /\b(noticias|notícias|news|aba de noticias|aba de notícias)\b/.test(text)

    let target: Page | null = null
    if (gotoServices) target = "services"
    else if (gotoAppointments) target = "appointments"
    else if (gotoNews) target = "news"
    else if (gotoDashboard) target = "dashboard"

    if (target) {
      onNavigate(target)
      const msg =
        target === "services"
          ? "Abrindo a aba de Solicitações de Serviço."
          : target === "appointments"
          ? "Abrindo a aba de Agendamentos."
          : target === "news"
          ? "Abrindo a aba de Notícias."
          : "Voltando ao painel inicial."
      setFeedback(msg)
      speak(msg)
    } else {
      const msg = "Não entendi o comando. Tente, por exemplo: 'acessar aba de solicitações'."
      setFeedback(msg)
      speak(msg)
    }

    setCommand("")
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 w-[min(28rem,90vw)]">
      <Card role="region" aria-label="Chatbot de comandos">
        <CardContent className="p-3 space-y-2">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Digite um comando, ex.: acessar aba de solicitações"
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