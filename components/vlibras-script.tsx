"use client"

import Script from "next/script"

export function VLibrasScript() {
  return (
    <>
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
    </>
  )
}
