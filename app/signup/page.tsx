"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import SignupHeader from "@/components/signup/header"
import SignupStep1 from "@/components/signup/signup-step1"
import SignupStep2 from "@/components/signup/signup-step2"
import SignupStep3 from "@/components/signup/signup-step3"
import ProgressBar from "@/components/signup/progress-bar"
import Image from "next/image"

interface SignupData {
  nickname: string
  userId: string
  password: string
  passwordConfirm: string
  email: string
  investmentScore: number
  investmentType: string
  selectedInterests: string[]
}

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // method = null → 회원가입 선택 화면
  const method = searchParams.get("method")
  const inSignup = method !== null

  // 회원가입 스텝 관리
  const [currentStep, setCurrentStep] = useState(1)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)

  // 회원가입 전체 데이터
  const [signupData, setSignupData] = useState<SignupData>({
    nickname: "",
    userId: "",
    password: "",
    passwordConfirm: "",
    email: "",
    investmentScore: 0,
    investmentType: "",
    selectedInterests: [],
  })

  useEffect(() => {
    if (method === "kakao") {
      setCurrentStep(2)
    }
  }, [method])

  const handleNextStep = (data?: Partial<SignupData>) => {
    if (data) {
      setSignupData((prev) => ({ ...prev, ...data }))
    }

    if (currentStep === 2) {
      setCurrentQuestionIdx(0)
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    console.log("Signup completed:", signupData)
    alert("회원가입이 완료되었습니다!")
  }

  const getProgressBarProps = () => {
    if (currentStep === 2) {
      return {
        currentStep,
        totalSteps: 3,
        quizProgress: currentQuestionIdx + 1,
        quizTotal: 10,
      }
    }
    return {
      currentStep,
      totalSteps: 3,
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <SignupHeader />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {!inSignup && (
          <div className="max-w-xl mx-auto mt-18 text-center">
            <h1 className="text-3xl font-bold text-[#000000] mb-5">회원가입</h1>

            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
              <div className="space-y-6">

                {/* sentistock signup */}
                <button
                  onClick={() => router.push("/signup?method=self")}
                  className="w-full bg-primary hover:bg-[#004280] text-white py-2.5 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
                >
                  <Image
                    src="/sentistock-white.png"
                    alt="sentistock"
                    width={120}
                    height={28}
                    priority
                  />
                  <span>회원가입</span>
                </button>

                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-sm text-muted-foreground">간편 회원가입</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                {/* kakao signup*/}
                <button
                  onClick={() => router.push("/signup?method=kakao")}
                  className="relative w-full bg-[#FFE812] hover:bg-[#FFD800] text-black py-2.5 px-6 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  <div className="absolute left-6 top-1/2 -translate-y-1/2">
                    <Image
                      src="/kakao-logo.png"
                      alt="kakao"
                      width={25}
                      height={25}
                      priority
                    />
                  </div>
                  <span>카카오톡 간편 회원가입</span>
                </button>

              </div>
            </div>
          </div>
        )}

        {inSignup && (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-[#0065F4] mb-2">회원가입</h1>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {method === "kakao" ? "카카오톡으로 빠르게 회원가입" : "sentistock 회원가입"}
                </span>
                <span className="text-sm font-semibold text-primary">{currentStep}/3</span>
              </div>

              <ProgressBar {...getProgressBarProps()} />
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border border-border p-8 shadow-sm">

              {currentStep === 1 && (
                <SignupStep1 data={signupData} onNext={handleNextStep} />
              )}

              {currentStep === 2 && (
                <SignupStep2
                  data={signupData}
                  onNext={handleNextStep}
                  onPrevious={handlePreviousStep}
                  currentQuestionIdx={currentQuestionIdx}
                  setCurrentQuestionIdx={setCurrentQuestionIdx}
                />
              )}

              {currentStep === 3 && (
                <SignupStep3
                  data={signupData}
                  onNext={handleNextStep}
                  onPrevious={handlePreviousStep}
                  onSubmit={handleSubmit}
                />
              )}

            </div>
          </>
        )}

      </div>
    </main>
  )
}
