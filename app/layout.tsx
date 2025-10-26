import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { VLibrasScript } from "@/components/vlibras-script"
import { ColorblindFilters } from "@/components/colorblind-filters"

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
        <ColorblindFilters />
        <div className="app-filter-root pt-0 min-h-screen flex flex-col">
          <AccessibilityProvider>{children}</AccessibilityProvider>
          <Analytics />
        </div>
        <VLibrasScript />
      </body>
    </html>
  )
}
