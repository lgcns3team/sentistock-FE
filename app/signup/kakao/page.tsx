"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import SignupStep2, { Step2Result } from "@/components/signup/signup-step2"
import SignupStep3 from "@/components/signup/signup-step3"
import ProgressBar from "@/components/signup/progress-bar"

import { signup } from "@/lib/api/auth"

export default function KakaoSignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const userId = searchParams.get("userId") || ""
  const nickname = searchParams.get("nickname") || ""
  const email = searchParams.get("email") || ""

  const [step, setStep] = useState(2)
  const [quizProgress, setQuizProgress] = useState(1)

  const [signupData, setSignupData] = useState({
    investmentScore: 0,
    investmentType: "",
  })

  useEffect(() => {
    if (!userId || !nickname) {
      alert("카카오 로그인 정보가 없습니다.")
      router.push("/signup")
    }
  }, [userId, nickname, router])

  const handleStep2Next = (data: Step2Result) => {
    setSignupData(data)
    setStep(3)
  }

  const handleStep3Submit = async (sectorIds: number[]) => {
    await signup({
      nickname,
      userId,
      password: "",
      passwordConfirm: "",
      userEmail: email,
      investorScore: signupData.investmentScore,
      favoriteSectorIds: sectorIds,
    })

    alert("회원가입이 완료되었습니다!")
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">
            카카오 회원가입
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
                onPrevious={() => setStep(2)}
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