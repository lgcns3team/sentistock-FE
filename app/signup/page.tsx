"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import SignupStep1, { Step1Data } from "@/components/signup/signup-step1"
import SignupStep2, { Step2Result } from "@/components/signup/signup-step2"
import SignupStep3 from "@/components/signup/signup-step3"
import ProgressBar from "@/components/signup/progress-bar"
import Image from "next/image"

import { signup } from "@/lib/api/auth"

interface SignupData extends Step1Data {
  investmentScore: number
  investmentType: string
  favoriteSectorIds: number[]
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const method = searchParams.get("method")
  const isSignupFlow = method !== null

  const [step, setStep] = useState(1)
  const [quizProgress, setQuizProgress] = useState(1)

  const [signupData, setSignupData] = useState<SignupData>({
    nickname: "",
    userId: "",
    password: "",
    passwordConfirm: "",
    email: "",
    investmentScore: 0,
    investmentType: "",
    favoriteSectorIds: [],
  })

  useEffect(() => {
    if (method === "kakao") {
      setStep(2)
    }
  }, [method])

  const handleStep1Next = (data: Step1Data) => {
    setSignupData((prev) => ({ ...prev, ...data }))
    setStep(2)
  }

  const handleStep2Next = (data: Step2Result) => {
    setSignupData((prev) => ({
      ...prev,
      investmentScore: data.investmentScore,
      investmentType: data.investmentType,
    }))
    setStep(3)
  }

  const handleStep3Submit = async (sectorIds: number[]) => {
    try {
      await signup({
        nickname: signupData.nickname,
        userId: signupData.userId,
        password: signupData.password,
        passwordConfirm: signupData.passwordConfirm,
        userEmail: signupData.email,
        investorScore: signupData.investmentScore,
        favoriteSectorIds: sectorIds,
      })

      alert("회원가입이 완료되었습니다!")
      router.push("/main-page")
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      } else {
        alert("회원가입 중 오류가 발생했습니다.")
      }
    }
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {!isSignupFlow && (
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

        {isSignupFlow && (
          <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-primary mb-2">
                회원가입
              </h1>

              <div className="flex justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {method === "kakao"
                    ? "카카오톡으로 빠르게 회원가입"
                    : "sentistock 회원가입"}
                </span>
                <span className="text-sm font-semibold">{step}/3</span>
              </div>

              <ProgressBar
                currentStep={step}
                totalSteps={3}
                quizProgress={step === 2 ? quizProgress : undefined}
                quizTotal={step === 2 ? 10 : undefined}
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border p-8 shadow-sm">
              {step === 1 && (
                <SignupStep1
                  data={signupData}
                  onNext={handleStep1Next}
                />
              )}

              {step === 2 && (
                <SignupStep2
                  onNext={handleStep2Next}
                  onPrevious={handlePrevious}
                  onProgressChange={setQuizProgress}
                />
              )}

              {step === 3 && (
                <SignupStep3
                  onPrevious={handlePrevious}
                  onSubmit={handleStep3Submit}
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}