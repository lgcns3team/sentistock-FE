"use client"

import StockInfo from "./stock-info"
import { useEffect, useMemo, useState } from "react"
import { useFavorites } from "@/hooks/useFavorites"

type Props = {
  stockName: string
  stockCode: string
  price: number
  change: number
  subscribe: boolean
  maxFreeFavorites?: number
}

type FavoriteRes = { favorite: boolean }

export type ToggleFavoriteResult =
  | { ok: true; favorite: boolean }
  | { ok: false; status: number }

export default function StockInfoContainer({
  stockName,
  stockCode,
  price,
  change,
  subscribe,
  maxFreeFavorites = 5,
}: Props) {
  const { favorites, isFavorite: isFavoriteLocal, toggleFavorite } = useFavorites()

  const [serverFavorite, setServerFavorite] = useState<boolean>(isFavoriteLocal(stockCode))

  const favoriteCount = favorites.length

  const apiFetch = async (path: string, init: RequestInit = {}) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    const headers = new Headers(init.headers || {})

    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    if (token) headers.set("Authorization", `Bearer ${token}`)

    return fetch(`${base}${path}`, { ...init, headers })
  }

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

      if (!token) {
        if (!cancelled) setServerFavorite(false)
        return
      }

      try {
        const res = await apiFetch(`/companies/${stockCode}/favorite`, { method: "GET" })
        if (cancelled) return

        if (res.status === 200) {
          const data: FavoriteRes = await res.json()
          const fav = Boolean(data.favorite)
          setServerFavorite(fav)

          if (fav && !isFavoriteLocal(stockCode)) toggleFavorite(stockCode)
          if (!fav && isFavoriteLocal(stockCode)) toggleFavorite(stockCode)

          return
        }

        setServerFavorite(false)
      } catch {
        if (!cancelled) setServerFavorite(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [stockCode])

  const onToggleFavorite = async (): Promise<ToggleFavoriteResult> => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    if (!token) return { ok: false, status: 401 }

    try {
      const res = await apiFetch(`/companies/${stockCode}/favorite/star`, {
        method: "POST",
      })

      if (res.status === 200) {
        const data: FavoriteRes = await res.json()
        const fav = Boolean(data.favorite)
        setServerFavorite(fav)

        const localFav = isFavoriteLocal(stockCode)
        if (fav && !localFav) toggleFavorite(stockCode)
        if (!fav && localFav) toggleFavorite(stockCode)

        return { ok: true, favorite: fav }
      }

      if (res.status === 401) return { ok: false, status: 401 }
      if (res.status === 403) return { ok: false, status: 403 }
      return { ok: false, status: res.status || 500 }
    } catch {
      return { ok: false, status: 0 }
    }
  }

  const isFavorite = useMemo(() => serverFavorite, [serverFavorite])

  return (
    <StockInfo
      stockName={stockName}
      stockCode={stockCode}
      price={price}
      change={change}
      subscribe={subscribe}
      favoriteCount={favoriteCount}
      maxFreeFavorites={maxFreeFavorites}
      isFavorite={serverFavorite}
      onToggleFavorite={onToggleFavorite}
    />
  )
}