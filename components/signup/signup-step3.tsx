"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SignupStep3Props {
  onPrevious: () => void
  onSubmit: (sectorIds: number[]) => void
}

const SECTOR_MAP: Record<string, number> = {
  "반도체": 1,
  "모빌리티": 2,
  "2차전지": 3,
  "재생에너지": 4,
  "원자력에너지": 5,
  "경기소비": 6,
  "필수소비": 7,
  "금융": 8,
  "헬스케어·바이오": 9,
  "엔터·콘텐츠": 10,
  "유틸리티": 11,
  "부동산": 12,
  "IT서비스·SW": 13,
  "인터넷·플랫폼": 14,
  "통신·미디어": 15,
  "소재": 16,
  "산업재·운송": 17,
}

const sectors = Object.keys(SECTOR_MAP)

export default function SignupStep3({ onPrevious, onSubmit }: SignupStep3Props) {
  const [selected, setSelected] = useState<string[]>([])

  const isMaxSelected = selected.length >= 5

  const toggleInterest = (sector: string) => {
    setSelected((prev) =>
      prev.includes(sector)
        ? prev.filter((v) => v !== sector)
        : prev.length < 5
          ? [...prev, sector]
          : prev
    )
  }

  const handleNext = () => {
    if (!selected.length) {
      alert("관심분야를 선택해주세요")
      return
    }

    onSubmit(selected.map((s) => SECTOR_MAP[s]))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">관심분야 선택</h2>
        <p className="text-sm text-muted-foreground">
          최대 5개까지 선택 가능합니다. ({selected.length}/5)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sectors.map((sector) => {
          const isSelected = selected.includes(sector)
          const isDisabled = isMaxSelected && !isSelected

          return (
            <button
              key={sector}
              onClick={() => toggleInterest(sector)}
              className={`p-3 rounded-md border-2 font-medium text-sm transition-all ${
                isSelected
                  ? "border-[0.25px] border-[#0065F4] bg-accent/10 text-[#061F5B]"
                  : isDisabled
                    ? "border-muted bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    : "border-border bg-card hover:border-[#0065F4] text-foreground cursor-pointer"
              }`}
              disabled={isDisabled}
            >
              {sector}
            </button>
          )
        })}
      </div>

      <div className="bg-accent/10 border border-secondary rounded-md p-4">
        <p className="text-sm text-foreground">
          <strong>선택한 관심분야:</strong>{" "}
          {selected.length > 0 ? selected.join(", ") : "아직 선택한 분야가 없습니다"}
        </p>
      </div>

      <div className="flex gap-3 pt-6">
        <Button onClick={onPrevious} variant="outline" className="flex-1 h-12 bg-transparent">
          이전
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
        >
          완료
        </Button>
      </div>
    </div>
  )
}
