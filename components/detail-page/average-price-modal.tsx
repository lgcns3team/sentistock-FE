"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface AveragePriceModalProps {
  onClose: () => void
  stockName: string
  stockCode: string
}

type PurchaseSaveReq = {
  companyId: string
  avgPrice: number
}

type MyPurchaseItem = {
  companyId: string
  name?: string
  avgPrice: number
}

export default function AveragePriceModal({ onClose, stockName, stockCode }: AveragePriceModalProps) {
  const [averagePrice, setAveragePrice] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const apiFetch = async (path: string, init: RequestInit = {}) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL
    const headers = new Headers(init.headers || {})

    headers.set("Content-Type", "application/json")
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)

    return fetch(`${base}${path}`, { ...init, headers })
  }

  const readTextSafely = async (res: Response) => {
    try {
      return await res.text()
    } catch {
      return ""
    }
  }

  const onSubmit = async () => {
    setError(null)
    const v = Number(averagePrice)

    if (!accessToken) {
      alert("로그인 후 이용할 수 있어요.")
      return
    }
    if (!stockCode || stockCode.length !== 6) {
      setError(`종목코드가 맞지 않습니다: "${stockCode}"`)
      return
    }
    if (!Number.isFinite(v) || v <= 0) {
      alert("평단가는 0보다 큰 숫자로 입력해 주세요.")
      return
    }

    setSaving(true)
    try {
      const body: PurchaseSaveReq = { companyId: stockCode, avgPrice: v }

      const saveRes = await apiFetch(`/purchase/save`, {
        method: "POST",
        body: JSON.stringify(body),
      })

      if (!saveRes.ok) {
        const t = await readTextSafely(saveRes)
        setError(
          `평단가 저장 실패`
        )
        return
      }

      // 저장 후 즉시 "내 구매목록" 재조회해서 실제 반영 여부 확인
      const listRes = await apiFetch(`/users/me/purchases`, { method: "GET" })
      if (!listRes.ok) {
        const t = await readTextSafely(listRes)
        setError(
          `저장 후 목록 조회 실패`
        )
        return
      }

      const list: MyPurchaseItem[] = await listRes.json()
      const found = list.find((p) => p.companyId === stockCode)

      if (!found) {
        setError(
          `저장은 성공으로 보이지만, 내 구매목록에 반영되지 않았습니다. ${list.length}`
        )
        return
      }

      onClose()
    } catch (e: any) {
      setError(`네트워크/런타임 오류: ${String(e?.message ?? e)}`)
    } finally {
      setSaving(false)
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
            value={averagePrice}
            onChange={(e) => setAveragePrice(e.target.value)}
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
            disabled={saving}
          >
            닫기
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? "저장 중..." : "입력"}
          </button>
        </div>
      </div>
    </div>
  )
}
