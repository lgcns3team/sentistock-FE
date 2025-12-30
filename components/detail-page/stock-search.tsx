"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "@/components/detail-page/search-bar"

type CompaniesMap = Record<string, string>

export default function StockSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [companies, setCompanies] = useState<CompaniesMap>({})

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/companies.json", { cache: "no-store" })
        if (!res.ok) {
          setCompanies({})
          return
        }
        const data = (await res.json()) as CompaniesMap
        setCompanies(data ?? {})
      } catch {
        setCompanies({})
      }
    }
    run()
  }, [])

  const localStockIndex = useMemo(() => {
    const idx: Record<string, string> = {}

    for (const [code, name] of Object.entries(companies)) {
      const codeKey = code.trim().toLowerCase()
      const nameKey = (name ?? "").trim().toLowerCase()

      if (codeKey) idx[codeKey] = code
      if (nameKey) idx[nameKey] = code

      if (nameKey) idx[nameKey.replace(/\s+/g, "")] = code
    }

    return idx
  }, [companies])

  const normalize = (s: string) => s.trim().toLowerCase()

  const handleSearch = () => {
    const raw = query
    const key = normalize(raw)
    if (!key) return

    const stockId = localStockIndex[key]

    const stockId2 = stockId ?? localStockIndex[key.replace(/\s+/g, "")]

    if (stockId2) {
      router.push(`/stock/${encodeURIComponent(stockId2)}/`)
      return
    }

    // 없으면 page.tsx  렌더
    router.push(`/stock/${encodeURIComponent(raw.trim())}/`)
  }

  return <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
}