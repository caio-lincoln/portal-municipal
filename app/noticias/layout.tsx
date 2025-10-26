import type React from "react"

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <section className="container mx-auto p-4 md:p-6 lg:p-8">{children}</section>
}
