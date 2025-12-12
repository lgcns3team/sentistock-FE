"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface AveragePriceModalProps {
  onClose: () => void
  stockName: string
  stockCode: string
}

export default function AveragePriceModal({ onClose, stockName, stockCode }: AveragePriceModalProps) {
  const [averagePrice, setAveragePrice] = useState("")

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-gray-900 mb-1">{stockName}</h2>
        <p className="text-xs text-gray-500 mb-6">KRX: {stockCode}</p>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">평균 단가</label>
          <input
            type="number"
            min="1"
            step="1"
            value={averagePrice}
            onChange={(e) => setAveragePrice(e.target.value)}
            placeholder="평균 단가를 입력하세요"
            className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50"
          >
            닫기
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
          >
            입력
          </button>
        </div>
      </div>
    </div>
  )
}
