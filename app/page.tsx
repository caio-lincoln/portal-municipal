"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { ServiceRequests } from "@/components/service-requests"
import { Appointments } from "@/components/appointments"
import { News } from "@/components/news"
import { VoiceChatModal } from "@/components/voice-chat-modal"
import { AccessibilityModal } from "@/components/accessibility-modal"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "services" | "appointments" | "news">("dashboard")

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        onMenuClick={() => {}} // Removido controle do menu lateral
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-8">
        {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
        {currentPage === "services" && <ServiceRequests />}
        {currentPage === "appointments" && <Appointments />}
        {currentPage === "news" && <News />}
      </main>
      <VoiceChatModal onNavigate={setCurrentPage} />
      <AccessibilityModal />
      <footer className="w-full py-6 mt-8 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center text-sm font-medium shadow-inner">
        Prefeitura Municipal de Aracaju &copy; {new Date().getFullYear()} — Todos os direitos reservados
      </footer>
    </div>
  )
}
