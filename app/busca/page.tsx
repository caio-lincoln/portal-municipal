import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { search } from "@/lib/search"
import Link from "next/link"

export default function BuscaPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams?.q || ""
  const results = q ? search(q) : []

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Busca no Portal</CardTitle>
              <p className="text-sm text-muted-foreground">Pesquise em páginas e notícias</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="flex gap-2" action="/busca" method="get">
            <Input name="q" defaultValue={q} placeholder="Digite sua busca" />
            <Button type="submit">Buscar</Button>
          </form>

          {q && (
            <p className="text-sm text-muted-foreground">Exibindo resultados para: <strong>{q}</strong></p>
          )}

          <div className="space-y-3">
            {results.map((r) => (
              <Card key={r.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">
                        <Link href={r.route} className="hover:underline">
                          {r.title}
                        </Link>
                      </h3>
                      {r.excerpt && (
                        <p className="text-sm text-muted-foreground">{r.excerpt}</p>
                      )}
                      <div className="flex gap-2 mt-1">
                        {r.category && <Badge variant="outline">{r.category}</Badge>}
                        {(r.tags || []).slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Link href={r.route}>
                        <Button variant="outline">Abrir</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {q && results.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum resultado encontrado.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
