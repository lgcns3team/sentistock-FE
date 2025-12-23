"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"

export interface Step2Result {
  investmentScore: number
  investmentType: string
}

interface SignupStep2Props {
  onNext: (data: Step2Result) => void
  onPrevious: () => void
  onProgressChange: (current: number) => void
}

export default function SignupStep2({ onNext, onPrevious, onProgressChange, }: SignupStep2Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null))
  const [idx, setIdx] = useState(0)
  const [showResult, setShowResult] = useState(false)

    const questions = [
    {
      id: 1,
      question: "향후 수입을 어떻게 예상하시나요?",
      options: [
        { label: "현재 일정한 수입이 발생하고 있으며, 향후 전체 수준을 유지하거나 증가할 것 같아요", score: 5 },
        { label: "현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것 같아요", score: 3 },
        { label: "현재 일정한 수입이 없으며, 현금이 주 수입원이에요", score: 1 },
      ],
    },
    {
      id: 2,
      question: "기존 보유하고 계신 총자산 대비 금융자산의 비중은 어느 정도인가요?",
      options: [
        { label: "5% 이하", score: 1 },
        { label: "10% 이하", score: 2 },
        { label: "20% 이하", score: 3 },
        { label: "30% 이하", score: 4 },
        { label: "30% 초과", score: 5 },
      ],
    },
    {
      id: 3,
      question: "투자한 경험이 있는 항목을 선택해주세요 (중복 가능)",
      options: [
        { label: "금융투자상품에 투자해 본 경험이 없음", score: 0 },
        { label: "주식신용거래, 선물/옵션 등 고위험 상품", score: 6 },
        { label: "주식, 주식형펀드 등", score: 3 },
        { label: "채권/혼합형 펀드, 신탁", score: 1 },
      ],
    },
    {
      id: 4,
      question: "어떤 목적으로 투자하시나요?",
      options: [
        { label: "투자 수익보다 원금 보존이 더 중요해요", score: 1 },
        { label: "현금 보존 가능성을 조금 포기하더라도 투자 수익을 낼 수 있으면 좋겠어요", score: 3 },
        { label: "원금 손실 위험이 있어도 높은 투자 수익을 원해요", score: 5 },
      ],
    },
    {
      id: 5,
      question: "고객님께서 감내하실 수 있는 투자수익 및 위험수준은 어느 정도인가요?",
      options: [
        { label: "무슨 일이 있어도 투자원금은 보전돼야해요", score: 1 },
        { label: "10% 정도만 변동이 있어도 매도하고 나와야 해요", score: 3 },
        { label: "20% 정도는 당황하지 않고 추가 매수도 가능해요", score: 4 },
        { label: "30% 정도 변동은 버틸 수 있고 그 이상의 변동도 가능해요", score: 5 },
      ],
    },
    {
      id: 6,
      question: "고객님의 금융지식 수준(이해도)는 어느 정도라고 생각하시나요?",
      options: [
        { label: "예적금 외에 다른 금융투자상품에 투자해본 적이 없어요", score: 1 },
        { label: "주식, 채권, 펀드 같은 일반적인 상품 정도는 설명만 좀 들으면 투자 여부를 결정할 수 있어요", score: 2 },
        { label: "주식, 채권, 펀드 같은 일반적인 상품은 잘 알고 있으며, 투자 여부를 결정할 수 있어요", score: 3 },
        { label: "파생상품을 포함한 대부분의 금융투자상품에 대해 충분히 잘 알고 있어요", score: 4 },
      ],
    },
    {
      id: 7,
      question: "금융 투자상품에 대한 이해가 부족하거나 투자 경험이 없으신가요?",
      options: [
        { label: "예, 금융취약계층입니다", score: 0 },
        { label: "아니요", score: 0 },
      ],
    },
    {
      id: 8,
      question: "고객님의 나이는 어떻게 되시나요?",
      options: [
        { label: "20세 미만", score: 1 },
        { label: "20세 ~ 35세 미만", score: 3 },
        { label: "35세 ~ 50세 미만", score: 5 },
        { label: "50세 ~ 60세 미만", score: 2 },
        { label: "65세 이상", score: 1 },
      ],
    },
    {
      id: 9,
      question: "현재 투자자산에 대한 투자예정기간은 어떻게 되시나요?",
      options: [
        { label: "1년 미만", score: 1 },
        { label: "1년 ~ 2년 미만", score: 2 },
        { label: "2년 ~ 3년 미만", score: 3 },
        { label: "3년 ~ 5년 미만", score: 4 },
        { label: "5년 이상", score: 5 },
      ],
    },
    {
      id: 10,
      question: "고객님의 연 소득은 어떻게 되시나요?",
      options: [
        { label: "2천만원 미만", score: 1 },
        { label: "2천만원 ~ 5천만원 미만", score: 2 },
        { label: "5천만원 ~ 7천만원 미만", score: 3 },
        { label: "7천만원 ~ 1억원 미만", score: 4 },
        { label: "1억원 이상", score: 5 },
      ],
    },
  ]

  useEffect(() => {
    onProgressChange(idx+1)
  }, [idx, onProgressChange])

  const totalScore = useMemo<number>(() =>
    answers.reduce<number>((sum, v, i) =>
      v !== null ? sum + questions[i].options[v].score : sum
    , 0),
    [answers, questions]
  )

  const investmentType = useMemo(() => {
    const score = totalScore ?? 0
    if (score >= 30)
      return { type: "공격투자형", level: 1, description: "높은 수익을 위해 큰 폭의 가격 변동도 적극적으로 감수하는 투자 성향입니다." }
    if (score >= 25)
      return { type: "적극투자형", level: 2, description: "수익을 우선시하되, 일정 수준의 손실 위험도 함께 감수하는 투자 성향입니다." }
    if (score >= 20)
      return { type: "위험중립형", level: 3, description: "수익과 안정성의 균형을 추구하는 중간 수준의 투자 성향입니다." }
    if (score >= 15)
      return { type: "안전추구형", level: 4, description: "원금 손실을 최대한 줄이면서 예금보다 조금 더 높은 수익을 추구하는 안정 지향 성향입니다." }
    return { type: "안정형", level: 5, description: "원금 보전을 최우선으로 하며, 손실 가능성이 매우 낮은 안전 자산을 선호하는 투자 성향입니다." }
  }, [totalScore])

  const handleSubmitStep = () => {
    onNext({
      investmentScore: totalScore,
      investmentType: investmentType.type,
    })
  }

  const currentQuestion = questions[idx]

  const handlePrevQuestion = () => {
    if (idx > 0) {
      setIdx((prev) => prev - 1)
    } else {
      onPrevious()
    }
  }

  const handleNext = () => {
    if (answers[idx] === null) {
      alert("이 질문에 답변해주세요")
      return
    }

    if (idx === questions.length - 1) {
      setShowResult(true)
    } else {
      setIdx((prev) => prev + 1)
    }
  }

  const handleSelectOption = (optionIndex: number) => {
    const copy = [...answers]
    copy[idx] = optionIndex
    setAnswers(copy)
  }


  if (showResult) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">당신의 투자 성향은?</h2>

        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold text-primary">{investmentType.type}</h3>
          <div className="flex justify-center gap-2 text-lg">
            <span className="font-semibold text-primary">{totalScore}점</span>
            <span className="text-muted-foreground">/ 45점</span>
          </div>
        </div>

        <div className="bg-accent/20 rounded-lg p-6 space-y-3">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-foreground mb-2">🔎 투자 성향 설명</h4>
              <p className="text-sm text-foreground leading-relaxed">{investmentType.description}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <Button onClick={() => setShowResult(false)} variant="outline" className="flex-1 h-12">
            다시 검토
          </Button>
          <Button onClick={handleSubmitStep} className="flex-1 h-12">
            다음
          </Button>
        </div>
      </div>
    )
  }

  const q = questions[idx]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Q. {currentQuestion.question}
        </h2>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectOption(index)}
            className={`w-full p-4 text-left rounded-md border-2 transition-all ${
              answers[idx] === index
                ? "border-primary bg-accent/10"
                : "border-border bg-card hover:border-secondary"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  answers[idx] === index
                    ? "border-primary bg-primary"
                    : "border-border"
                }`}
              >
                {answers[idx] === index && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="text-sm text-foreground">{option.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3 pt-6">
        <Button
          onClick={handlePrevQuestion}
          variant="outline"
          className="flex-1 h-12 bg-transparent"
          disabled={idx === 0}
        >
          {idx === 0 ? "이전" : "이전 질문"}
        </Button>

        <Button
          onClick={handleNext}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
        >
          {idx === questions.length - 1 ? "완료" : "다음 질문"}
        </Button>
      </div>
    </div>

  )
}