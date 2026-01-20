"use client"

import { X } from "lucide-react"
import { useState } from "react"

export default function AveragePriceModal({
  onClose,
  stockName,
  stockCode,
}: {
  onClose: () => void
  stockName: string
  stockCode: string
}) {
  const [avgPrice, setAvgPrice] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const apiFetch = async (path: string, init: RequestInit = {}) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    const headers = new Headers(init.headers || {})

    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    if (token) headers.set("Authorization", `Bearer ${token}`)

    // JSON 요청
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json")

    return fetch(`${base}${path}`, { ...init, headers })
  }

  const onSubmit = async () => {
    setError(null)

    const n = Number(avgPrice)
    if (!Number.isFinite(n) || n <= 0) {
      setError("평단가를 올바르게 입력해 주세요.")
      return
    }

    setLoading(true)
    try {
      const res = await apiFetch(`/purchase/save`, {
        method: "POST",
        body: JSON.stringify({
          companyId: stockCode,
          avgPrice: n,
        }),
      })

      if (res.status === 200) {
        alert("평단가가 저장되었습니다.")
        onClose()
        return
      }

      if (res.status === 401) return alert("로그인이 필요합니다.")
      if (res.status === 403) return alert("권한이 없거나 구독 서비스에 포함되는 기능입니다.")
      return alert(`저장 실패 (${res.status})`)
    } catch {
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-1">{stockName}</h2>
        <p className="text-xs text-gray-500 mb-4">KRX: {stockCode}</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">평균 단가</label>
          <input
            type="number"
            min="1"
            step="1"
            value={avgPrice}
            onChange={(e) => setAvgPrice(e.target.value)}
            placeholder="예) 72500"
            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <pre className="mb-4 p-3 rounded bg-red-50 text-red-700 text-xs whitespace-pre-wrap">
            {error}
          </pre>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50"
            disabled={loading}
          >
            닫기
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "저장 중..." : "입력"}
          </button>
        </div>
      </div>
    </div>
  )
}
