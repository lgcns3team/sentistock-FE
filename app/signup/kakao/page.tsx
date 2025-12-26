"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import SignupStep2, { Step2Result } from "@/components/signup/signup-step2"
import SignupStep3 from "@/components/signup/signup-step3"
import ProgressBar from "@/components/signup/progress-bar"

export default function KakaoSignupPage() {
  const router = useRouter()

  const [step, setStep] = useState<2 | 3>(2)
  const [quizProgress, setQuizProgress] = useState(1)

  const [investorScore, setInvestorScore] = useState(0)
  const [favoriteSectorIds, setFavoriteSectorIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const handleStep2Next = (data: Step2Result) => {
    setInvestorScore(data.investmentScore)
    setStep(3)
  }

  const handleStep3Submit = async (sectors: number[]) => {
    try {
      setLoading(true)

      const accessToken = localStorage.getItem("accessToken")
      const tokenType = localStorage.getItem("tokenType") ?? "Bearer"

      if (!accessToken) {
        throw new Error("로그인이 필요합니다.")
      }

      const res = await fetch(
        "http://localhost:8080/api/users/me/onboarding",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${accessToken}`,
          },
          body: JSON.stringify({
            investorScore,
            favoriteSectorIds: sectors,
          }),
        }
      )

      if (!res.ok) {
        throw new Error("온보딩 저장에 실패했습니다.")
      }

      localStorage.setItem("onboardingRequired", "false")
      router.replace("/main-page")
    } catch (e) {
      alert(e instanceof Error ? e.message : "온보딩 중 오류 발생")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">
            카카오 회원 온보딩
          </h1>
          <span className="text-sm font-semibold">{step}/3</span>

          <ProgressBar
            currentStep={step}
            totalSteps={3}
            quizProgress={step === 2 ? quizProgress : undefined}
            quizTotal={step === 2 ? 10 : undefined}
          />
        </div>

        <div className="bg-white rounded-lg border p-8 shadow-sm">
          {step === 2 && (
            <SignupStep2
              onNext={handleStep2Next}
              onPrevious={() => router.replace("/signup/kakao")}
              onProgressChange={setQuizProgress}
            />
          )}

          {step === 3 && (
            <SignupStep3
              onPrevious={() => setStep(2)}
              onSubmit={handleStep3Submit}
            />
          )}
        </div>
      </div>
    </main>
  )
}