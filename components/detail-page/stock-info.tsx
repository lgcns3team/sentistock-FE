"use client"

import { useState } from "react"
import AveragePriceModal from "./average-price-modal"
import { Star, X } from "lucide-react"
import Link from "next/link"
import type { ToggleFavoriteResult } from "./stock-info-container"

interface StockInfoProps {
  stockName: string
  stockCode: string
  price: number
  change: number
  subscribe: boolean
  favoriteCount: number
  maxFreeFavorites?: number

  isFavorite: boolean
  onToggleFavorite: () => Promise<ToggleFavoriteResult>
}

export default function StockInfo({
  stockName,
  stockCode,
  price,
  change,
  subscribe,
  favoriteCount,
  maxFreeFavorites = 5,
  onToggleFavorite,
  isFavorite,
}: StockInfoProps) {
  const [showAverageModal, setShowAverageModal] = useState(false)
  const [showFavoriteModal, setShowFavoriteModal] = useState(false)
  const [showFavoriteLimitModal, setShowFavoriteLimitModal] = useState(false)

  const handleStarClick = async () => {
    if (!subscribe && !isFavorite && favoriteCount >= maxFreeFavorites) {
      setShowFavoriteLimitModal(true)
      return
    }

    const result = await onToggleFavorite()

    if (result.ok) {
      if (result.favorite === true && !isFavorite) setShowFavoriteModal(true)
      return
    }

    if (result.status === 401) return alert("로그인이 필요합니다.")
    if (result.status === 403) {
      if (!subscribe && !isFavorite) {
        setShowFavoriteLimitModal(true)
        return
      }

      alert("권한이 없거나 구독 서비스에 포함되는 기능입니다.")
      return
    }
    if (result.status === 0) return alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
    return alert("요청 처리 중 오류가 발생했습니다.")
  }

  const isUp = change >= 0
  const changeColor = isUp ? "text-red-500" : "text-blue-500"

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Left side - 이름/코드 + 즐겨찾기 + 평단가 입력 */}
          <div className="flex items-start gap-4">
            {/* 종목명 + 종목코드 */}
            <div className="flex flex-col">
              <h1
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.2">
                {stockName}
              </h1>

              <p className="text-gray-500 text-xs sm:text-sm">
                KRX : {stockCode}
              </p>
            </div>

            {/* 즐겨찾기 + 평단가 입력 */}
            <div className="flex flex-col items-start gap-0.5 pt-1">
              <button
                type="button"
                onClick={handleStarClick}
                aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                className="text-gray-300 hover:text-yellow-400"
              >
                <Star
                  className={
                    "w-6 h-6 transition-colors " +
                    (isFavorite
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300")
                  }
                />
              </button>

              <button
                type="button"
                onClick={() => setShowAverageModal(true)}
                className="px-2 py-0.5 text-[11px] sm:text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              >
                평단가 입력
              </button>
            </div>
          </div>
          {/* 제한 모달 */}
          {showFavoriteLimitModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
              <div className="relative z-[10000] bg-white rounded-lg p-6 w-[90%] max-w-sm">
                <h2 className="text-lg font-semibold">즐겨찾기 한도 초과</h2>
                <p className="text-sm text-gray-600 mt-2">
                  구독하지 않은 계정은 즐겨찾기를 최대 {maxFreeFavorites}개까지 <br />사용할 수 있어요.
                </p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 h-10 rounded-md border"
                    onClick={() => setShowFavoriteLimitModal(false)}
                  >
                    닫기
                  </button>
                  <Link
                    href="/my-page/subscription"
                    className="flex-1 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center"
                    onClick={() => setShowFavoriteLimitModal(false)}
                  >
                    구독하기
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Right side - 현재가, 등락률 */}
          <div className="text-right sm:ml-auto">
            <div className="flex flex-col sm:flex-row items-end gap-3">
              <div>
                <p
                  className={`text-2xl sm:text-3xl font-bold ${changeColor}`}
                >
                  {price.toLocaleString()}
                </p>
                <p
                  className={`${changeColor} font-semibold text-sm sm:text-base`}
                >
                  {isUp ? "+" : ""}
                  {change.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 평단가 입력 모달 */}
      {showAverageModal && (
        <AveragePriceModal
          onClose={() => setShowAverageModal(false)}
          stockName={stockName}
          stockCode={stockCode}
        />
      )}

      {/* 즐겨찾기 추가 안내 모달 */}
      {showFavoriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="relative bg-white rounded-lg px-6 py-6 shadow-md text-center max-w-xs w-full">
            {/* X 버튼 */}
            <button
              onClick={() => setShowFavoriteModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-6">
              즐겨찾기 목록에 추가되었습니다.
            </h2>

            <button
              type="button"
              onClick={() => setShowFavoriteModal(false)}
              className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  )
}