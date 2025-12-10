"use client"

import { useState } from "react"
import AveragePriceModal from "./average-price-modal"
import { Star } from "lucide-react"


interface StockInfoProps {
  stockName: string
  stockCode: string
  price: number
  change: number
}

export default function StockInfo({ stockName, stockCode, price, change }: StockInfoProps) {
  const [showModal, setShowModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleStarClick = () => {
    setIsFavorite((prev) => {
      const next = !prev
      if (next) {
        setShowModal(true)
      }
      return next
    })
  }

  const isUp = change >= 0
  const changeColor = isUp ? "text-red-500" : "text-blue-500"

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left side - Stock name and code */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{stockName}</h1>
            <p className="text-gray-500 text-xs sm:text-sm">KRX : {stockCode}</p>
          </div>

          {/* Right side - Price and change */}
          <div className="text-right">
            <div className="flex flex-col sm:flex-row items-end gap-3">
              <div>
                <p className={`text-2xl sm:text-3xl font-bold ${changeColor}`}>{price.toLocaleString()}</p>
                <p className={`${changeColor} font-semibold text-sm sm:text-base`}>
                  {isUp ? "+" : ""}
                  {change.toFixed(2)}%
                </p>
              </div>
              {/* 즐겨찾기 버튼 */}
              <button
                type="button"
                onClick={handleStarClick}
                className="mt-1"
                aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              >
                <Star
                  className={
                    "w-6 h-6 transition-colors " +
                    (isFavorite
                      ? "fill-yellow-400 text-yellow-400"  
                      : "text-gray-300"
                    )
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Average Price Modal */}
      {showModal && (
        <AveragePriceModal
          onClose={() => setShowModal(false)}
          stockName={stockName}
          stockCode={stockCode}
        />
      )}
    </>
  )
}
