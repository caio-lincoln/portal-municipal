import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AccessibilityProvider } from "@/components/accessibility-provider"
// import { FloatingAccessibility } from "@/components/floating-accessibility"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal da Prefeitura de Aracaju",
  description:
    "Portal oficial da Prefeitura Municipal de Aracaju - Serviços, agendamentos e informações para o cidadão",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <div className="app-filter-root pt-0 min-h-screen flex flex-col">
          <AccessibilityProvider>
            {/* <FloatingAccessibility /> */}
            {children}
          </AccessibilityProvider>
          <Analytics />
        </div>
      </body>
    </html>
  )
}
