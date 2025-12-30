"use client"

import { useEffect, useMemo, useState } from "react"
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

function normalizeBaseUrl(raw: string) {
  const trimmed = raw.replace(/\/+$/, "")
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`
}

function safeNumber(v: unknown, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

type PendingDelete = { id: string; name: string } | null

export default function StockListPage() {
  const router = useRouter()

  const [stocks, setStocks] = useState<UiPurchasedStock[]>([])
  const [loading, setLoading] = useState(true)
  const [serverDown, setServerDown] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null)

  const BASE_URL = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"
    return normalizeBaseUrl(raw)
  }, [])

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const fetchPurchasedStocks = async () => {
    const ENDPOINT = "/users/me/purchases"

    if (!token) {
      setErrorMsg("로그인이 필요합니다. accessToken이 없습니다.")
      setLoading(false)
      return
    }

    try {
      setServerDown(false)
      setErrorMsg(null)

      const res = await fetch(`${BASE_URL}${ENDPOINT}`, {
        headers: { Authorization: `Bearer ${token}` },
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
        id: String(it.companyId ?? ""),
        name: String(it.companyName ?? ""),
        purchasePrice: safeNumber(it.avgPrice),
        currentPrice: safeNumber(it.currentPrice),
        change: safeNumber(it.profitRate),
      }))

      setStocks(ui.filter((x) => x.id && x.name))
    } catch {
      setServerDown(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPurchasedStocks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE_URL])

  const requestDelete = (id: string, name: string) => {
    setPendingDelete({ id, name })
  }

  const closeModal = () => setPendingDelete(null)

  const confirmDelete = async () => {
    if (!pendingDelete) return
    if (!token) {
      setErrorMsg("로그인이 필요합니다. accessToken이 없습니다.")
      closeModal()
      return
    }

    const { id } = pendingDelete
    const DELETE_ENDPOINT = "/purchase/delete"

    try {
      setDeletingId(id)
      setErrorMsg(null)

      const res = await fetch(`${BASE_URL}${DELETE_ENDPOINT}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({ companyId: id }),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        setErrorMsg(
          `삭제 실패: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`
        )
        return
      }

      setStocks((prev) => prev.filter((s) => s.id !== id))
      closeModal()
    } catch {
      setServerDown(true)
      closeModal()
    } finally {
      setDeletingId(null)
    }
  }

  // 모달 열렸을 때 ESC로 닫기 + 스크롤 잠금
  useEffect(() => {
    if (!pendingDelete) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    document.addEventListener("keydown", onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [pendingDelete])

  if (loading) {
    return <div className="flex-1 px-10 py-8">로딩 중...</div>
  }

  if (serverDown) {
    return (
      <div className="flex-1 px-10 py-8">
        <h2 className="mb-2 text-xl font-semibold">서버 연결 실패</h2>
        <p className="text-sm text-gray-500">백엔드 서버가 실행 중인지 확인해주세요.</p>
      </div>
    )
  }

  if (errorMsg) {
    return (
      <div className="flex-1 px-10 py-8">
        <h2 className="mb-2 text-xl font-semibold">에러</h2>
        <p className="text-sm text-gray-500 whitespace-pre-wrap">{errorMsg}</p>
        <button
          type="button"
          onClick={() => {
            setLoading(true)
            fetchPurchasedStocks()
          }}
          className="mt-4 rounded-md border px-3 py-2 text-sm"
        >
          다시 불러오기
        </button>
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
            const changeText = `${isUp ? "+" : ""}${stock.change.toFixed(2)}%`
            const isDeleting = deletingId === stock.id

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
                          <g transform={isUp ? undefined : "translate(0 32) scale(1 -1)"}>
                            <polyline
                              points="0,28 20,24 40,18 60,22 80,8"
                              fill="none"
                              stroke={isUp ? "#ef4444" : "#3b82f6"}
                              strokeWidth={2}
                            />
                          </g>
                        </svg>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {stock.currentPrice.toLocaleString()}
                        </div>
                        <div className={`text-xs ${isUp ? "text-red-500" : "text-blue-500"}`}>
                          {changeText}
                        </div>
                      </div>

                      <div className="min-w-[60px] text-right">
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            requestDelete(stock.id, stock.name)
                          }}
                          className={[
                            "text-xs font-medium transition",
                            isDeleting
                              ? "cursor-not-allowed text-gray-400"
                              : "text-gray-500 hover:text-red-600",
                          ].join(" ")}
                        >
                          {isDeleting ? "삭제 중" : "삭제"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {pendingDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onMouseDown={(e) => {
            // 바깥 클릭 닫기
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-[92%] max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h3 id="delete-title" className="text-base font-semibold text-gray-900">
              매수 종목 삭제
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{pendingDelete.name}</span>{" "}
              종목을 삭제할까요?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                disabled={deletingId === pendingDelete.id}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deletingId === pendingDelete.id}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === pendingDelete.id ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
