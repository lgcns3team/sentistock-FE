"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "@/components/detail-page/search-bar"
import { stockIndex } from "@/lib/stocks"


export default function StockSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    const key = query.trim().toLowerCase()
    if (!key) return

    const stockId = stockIndex[key]

    if (stockId) {
      router.push(`/stock/${stockId}`)
    } else {
      alert("해당 종목을 찾을 수 없습니다.")
    }
  }

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      onSubmit={handleSearch}
    />
  )
}
