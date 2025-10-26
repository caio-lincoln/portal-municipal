import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import Script from "next/script"

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
          <AccessibilityProvider>{children}</AccessibilityProvider>
          <Analytics />
        </div>
        <div vw="true" className="enabled">
          <div vw-access-button="true" className="active"></div>
          <div vw-plugin-wrapper="true">
            <div className="vw-plugin-top-wrapper"></div>
          </div>
        </div>
        <Script
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log("[v0] VLibras script loaded")
            // @ts-ignore
            if (typeof window !== "undefined" && window.VLibras) {
              // @ts-ignore
              new window.VLibras.Widget("https://vlibras.gov.br/app")
              console.log("[v0] VLibras widget initialized")
            }
          }}
          onError={(e) => {
            console.error("[v0] Erro ao carregar VLibras:", e)
          }}
        />
      </body>
    </html>
  )
}
