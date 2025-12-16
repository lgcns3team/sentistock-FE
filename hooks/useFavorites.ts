//임시 저장소 (서버DB연결 전)

"use client"
import { useEffect, useState } from "react"

const KEY = "favorites:v1"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      setFavorites(raw ? JSON.parse(raw) : [])
    } catch {
      setFavorites([])
    }
  }, [])

  const save = (next: string[]) => {
    setFavorites(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  const isFavorite = (code: string) => favorites.includes(code)

  const toggleFavorite = (code: string) => {
    if (favorites.includes(code)) save(favorites.filter((c) => c !== code))
    else save([...favorites, code])
  }

  return { favorites, isFavorite, toggleFavorite }
}