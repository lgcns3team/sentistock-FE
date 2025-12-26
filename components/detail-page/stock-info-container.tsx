"use client"

import StockInfo from "./stock-info"
import { useEffect, useMemo, useState } from "react"

type Props = {
  stockName: string
  stockCode: string
  price: number
  change: number
  subscribe: boolean
}

type FavoriteRes = { favorite: boolean }

export default function StockInfoContainer(props: Props) {
  const { stockCode, subscribe } = props

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const apiFetch = async (path: string, init: RequestInit = {}) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    const headers = new Headers(init.headers || {})

    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

    return fetch(`${base}${path}`, { ...init, headers })
  }

  const [isFavorite, setIsFavorite] = useState(false)

  // 즐겨찾기 여부 조회
  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (!accessToken) {
        if (!cancelled) setIsFavorite(false)
        return
      }

      try {
        const res = await apiFetch(`/companies/${stockCode}/favorite`, {
          method: "GET",
        })
        if (!cancelled) {
          if (res.status === 200) {
            const data: FavoriteRes = await res.json()
            setIsFavorite(Boolean(data.favorite))
          } else {
            setIsFavorite(false)
          }
        }
      } catch {
        if (!cancelled) setIsFavorite(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [stockCode, accessToken])

  const onToggleFavorite = async () => {
    if (!accessToken) {
      alert("로그인 후 이용할 수 있어요.")
      return
    }

    try {
      const res = await apiFetch(`/companies/${stockCode}/favorite/star`, {
        method: "POST",
      })

      if (res.status === 200) {
        const data: FavoriteRes = await res.json()
        setIsFavorite(Boolean(data.favorite))
        return
      }

      if (res.status === 401 || res.status === 403) {
        alert("로그인 상태가 아니거나 권한이 없어요. 다시 로그인해 주세요.")
        return
      }

      alert("즐겨찾기 처리에 실패했어요.")
    } catch {
      alert("네트워크 오류로 즐겨찾기 처리에 실패했어요.")
    }
  }

  const favoriteCount = useMemo(() => 0, [])

  return (
    <StockInfo
      {...props}
      subscribe={subscribe}
      favoriteCount={favoriteCount}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
    />
  )
}