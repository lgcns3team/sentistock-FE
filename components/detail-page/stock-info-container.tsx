//subscribe, 즐겨찾기 수 count, StockInfo에 props로 내려줌
"use client"

import StockInfo from "./stock-info"
import { useFavorites } from "@/hooks/useFavorites"

type Props = {
  stockName: string
  stockCode: string
  price: number
  change: number
}

export default function StockInfoContainer(props: Props) {
  // 임시: 나중에 서버 연결되면 여기만 교체하면 됨
  const subscribe = false

  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  return (
    <StockInfo
      {...props}
      subscribe={subscribe}
      favoriteCount={favorites.length}
      isFavorite={isFavorite(props.stockCode)}
      onToggleFavorite={() => toggleFavorite(props.stockCode)}
    />
  )
}