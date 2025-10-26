"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { ServiceRequests } from "@/components/service-requests"
import { Appointments } from "@/components/appointments"
import { News } from "@/components/news"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "services" | "appointments" | "news">("dashboard")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {currentPage === "dashboard" && <Dashboard onNavigate={setCurrentPage} />}
          {currentPage === "services" && <ServiceRequests />}
          {currentPage === "appointments" && <Appointments />}
          {currentPage === "news" && <News />}
        </main>
      </div>
    </div>
  )
}
