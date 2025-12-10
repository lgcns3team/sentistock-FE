"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SignupStep3Props {
  data: any
  onNext: (data: any) => void
  onPrevious: () => void
  onSubmit: () => void
}

export default function SignupStep3({ data, onNext, onPrevious, onSubmit }: SignupStep3Props) {
  const sectors = [
    "IT서비스·SW",
    "인터넷·플랫폼",
    "통신·미디어",
    "소재",
    "산업재·운송",
    "경기소비",
    "필수소비",
    "금융",
    "헬스케어·바이오",
    "엔터·콘텐츠",
    "유틸리티",
    "부동산",
    "반도체",
    "모빌리티",
    "2차전지",
    "재생에너지",
    "원자력에너지",
  ]

  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.selectedInterests || [])

  const toggleInterest = (sector: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(sector)) {
        return prev.filter((s) => s !== sector)
      } else if (prev.length < 5) {
        return [...prev, sector]
      }
      return prev
    })
  }

  const handleNext = () => {
    if (selectedInterests.length === 0) {
      alert("최소 1개 이상의 관심분야를 선택해주세요")
      return
    }
    onNext({ selectedInterests })
    onSubmit()
  }

  const isMaxSelected = selectedInterests.length >= 5

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">관심분야 선택</h2>
        <p className="text-sm text-muted-foreground">최대 5개까지 선택 가능합니다. ({selectedInterests.length}/5)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sectors.map((sector) => {
          const isSelected = selectedInterests.includes(sector)
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
          {selectedInterests.length > 0 ? selectedInterests.join(", ") : "아직 선택한 분야가 없습니다"}
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
