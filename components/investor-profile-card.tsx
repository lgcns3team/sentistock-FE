"use client"

// components/investor-profile-card.tsx

type Props = {
  investorType?: string
}

interface InvestorLevel {
  grade: string
  name: string
  description: string
  range: string
}

const levels: InvestorLevel[] = [
  {
    grade: "1등급",
    name: "공격투자형",
    description:
      "높은 수익을 위해 큰 폭의 가격 변동도 적극적으로 감수하는 투자 성향입니다.",
    range: "30점 이상",
  },
  {
    grade: "2등급",
    name: "적극투자형",
    description:
      "수익을 우선시하며, 일정 수준의 손실 위험도 함께 감수하는 투자 성향입니다.",
    range: "25~29점",
  },
  {
    grade: "3등급",
    name: "위험중립형",
    description: "수익과 안정성의 균형을 추구하는 중간 수준의 투자 성향입니다.",
    range: "20~24점",
  },
  {
    grade: "4등급",
    name: "안전추구형",
    description:
      "원금 손실을 최대한 줄이면서 예금보다 조금 더 높은 수익을 추구하는 안정 지향 성향입니다.",
    range: "15~19점",
  },
  {
    grade: "5등급",
    name: "안정형",
    description:
      "원금 보전을 최우선으로 하며, 손실 가능성이 매우 낮은 안전 자산을 선호하는 투자 성향입니다.",
    range: "14점 이하",
  },
]

function getLevelIndex(investorType?: string) {
  switch (investorType) {
    case "공격투자형":
      return 0
    case "적극투자형":
      return 1
    case "위험중립형":
      return 2
    case "안전추구형":
      return 3
    case "안정형":
      return 4
    default:
      return 4
  }
}

export default function InvestorProfileCard({ investorType }: Props) {
  const currentLevelIndex = getLevelIndex(investorType)
  const currentLevel = levels[currentLevelIndex]

  // 막대는 왼쪽(안정형) -> 오른쪽(공격투자형) 라벨 방향이라서
  // levels 인덱스(공격=0, 안정=4)를 반대로 뒤집어서 채움
  const barIndex = levels.length - 1 - currentLevelIndex

  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900">투자 성향 결과</h3>

      <div className="mt-4 space-y-2">
        <p className="text-xs text-gray-500">나의 투자 성향</p>

        <div className="inline-flex items-center rounded-full bg-[#E8F0FF] px-3 py-1 text-xs font-medium text-[#2563EB]">
          {currentLevel.grade} · {currentLevel.name}
          <span className="ml-1 text-[10px] text-[#1E40AF]">
            ({currentLevel.range})
          </span>
        </div>

        <p className="text-sm text-gray-700">{currentLevel.description}</p>
      </div>

      <div className="mt-6">
        <div className="mb-1 flex justify-between text-[11px] text-gray-500">
          <span>안정형</span>
          <span>공격투자형</span>
        </div>

        <div className="flex gap-1">
          {levels.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full ${
                idx <= barIndex ? "bg-[#2563EB]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {levels.map((lvl, idx) => {
          const isActive = idx === currentLevelIndex

          return (
            <div
              key={lvl.grade}
              className={`rounded-xl border p-4 transition ${
                isActive
                  ? "border-[#2563EB] bg-[#E8F0FF]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-[#2563EB]" : "text-gray-800"
                  }`}
                >
                  {lvl.grade} · {lvl.name}
                </span>

                <span
                  className={`text-xs ${
                    isActive ? "text-[#1E40AF]" : "text-gray-500"
                  }`}
                >
                  {lvl.range}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-gray-600">{lvl.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
