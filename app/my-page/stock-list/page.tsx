"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type PurchasedStockDto = {
  companyId: string
  companyName: string
  avgPrice: number
  currentPrice: number
  profitRate: number
}

type UiPurchasedStock = {
  id: string
  name: string
  purchasePrice: number
  currentPrice: number
  change: number
}

export default function StockListPage() {
  const router = useRouter()

  const [stocks, setStocks] = useState<UiPurchasedStock[]>([])
  const [loading, setLoading] = useState(true)
  const [serverDown, setServerDown] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api"

    // Swagger: /api/users/me/purchases
    const ENDPOINT = "/users/me/purchases"

    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    if (!token) {
      setErrorMsg("로그인이 필요합니다. accessToken이 없습니다.")
      setLoading(false)
      return
    }

    const fetchPurchasedStocks = async () => {
      try {
        const res = await fetch(`${BASE_URL}${ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })

        if (!res.ok) {
          const text = await res.text().catch(() => "")
          setErrorMsg(
            `요청 실패: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`
          )
          return
        }

        const raw = await res.json()

        const list: PurchasedStockDto[] = Array.isArray(raw)
          ? raw
          : (raw?.data ?? raw?.result ?? raw?.items ?? [])

        const ui: UiPurchasedStock[] = list.map((it) => ({
          id: it.companyId,
          name: it.companyName,
          purchasePrice: it.avgPrice,
          currentPrice: it.currentPrice,
          change: it.profitRate,
        }))

        setStocks(ui)
      } catch {
        setServerDown(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPurchasedStocks()
  }, [])

  if (loading) {
    return <div className="flex-1 px-10 py-8">로딩 중...</div>
  }

  if (serverDown) {
    return (
      <div className="flex-1 px-10 py-8">
        <h2 className="mb-2 text-xl font-semibold">서버 연결 실패</h2>
        <p className="text-sm text-gray-500">
          백엔드 서버가 실행 중인지 확인해주세요.
        </p>
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="flex-1 px-10 py-8">
        <h2 className="mb-2 text-xl font-semibold">에러</h2>
        <p className="text-sm text-gray-500">{errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 px-10 py-8">
      <header>
        <h2 className="mb-2 text-xl font-semibold">매수 종목 리스트</h2>
        <p className="mb-8 text-sm text-gray-500">
          보유 중인 종목의 평단가, 현재가, 수익률을 한 번에 확인할 수 있어요.
        </p>
      </header>

      {stocks.length === 0 ? (
        <div className="max-w-4xl rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
          아직 등록된 매수 종목이 없어요.
        </div>
      ) : (
        <div className="max-w-4xl space-y-3 md:space-y-4">
          {stocks.map((stock) => {
            const isUp = stock.change >= 0
            const changeText = `${isUp ? "+" : ""}${stock.change}`

            return (
              <button
                key={stock.id}
                type="button"
                onClick={() => router.push(`/stock/${stock.id}`)}
                className="group w-full cursor-pointer text-left"
              >
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition group-hover:border-blue-200 group-hover:bg-blue-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:px-6 sm:py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
                      <span className="text-sm font-medium text-gray-900 sm:min-w-[100px]">
                        {stock.name}
                      </span>
                      <div className="rounded-full bg-gray-100 px-4 py-1 text-xs text-gray-700">
                        평단 {stock.purchasePrice.toLocaleString()}원
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-8">
                      <div className="h-8 w-20">
                        <svg viewBox="0 0 80 32" className="h-full w-full">
                          <polyline
                            points="0,28 20,24 40,18 60,22 80,8"
                            fill="none"
                            stroke={isUp ? "#ef4444" : "#3b82f6"}
                            strokeWidth={2}
                          />
                        </svg>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {stock.currentPrice.toLocaleString()}
                        </div>
                        <div
                          className={`text-xs ${isUp ? "text-red-500" : "text-blue-500"}`}
                        >
                          {changeText}
                        </div>
                      </div>

                      <div className="min-w-[60px] text-right text-xs font-medium text-gray-500">
                        수익률
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
