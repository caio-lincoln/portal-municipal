import { NextRequest } from "next/server"
import { search } from "@/lib/search"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""
  const items = search(q)
  return new Response(JSON.stringify({ query: q, results: items }), {
    headers: { "content-type": "application/json" },
  })
}

export async function POST(req: NextRequest) {
  const { q } = await req.json()
  const items = search(q || "")
  return new Response(JSON.stringify({ query: q || "", results: items }), {
    headers: { "content-type": "application/json" },
  })
}