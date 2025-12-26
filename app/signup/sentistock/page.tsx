"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import SignupStep1, { Step1Data } from "@/components/signup/signup-step1"
import SignupStep2, { Step2Result } from "@/components/signup/signup-step2"
import SignupStep3 from "@/components/signup/signup-step3"
import ProgressBar from "@/components/signup/progress-bar"
import Image from "next/image"
import Header from "@/components/header"

import { signup } from "@/lib/api/auth"

interface SignupData extends Step1Data {
  investmentScore: number
  investmentType: string
  favoriteSectorIds: number[]
}

export default function SignupPage() {
  const router = useRouter()

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

  const handleStep1Next = (data: Step1Data) => {
    setSignupData(prev => ({ ...prev, ...data }))
    setStep(2)
  }

  const handleStep2Next = (data: Step2Result) => {
    setSignupData(prev => ({
      ...prev,
      investmentScore: data.investmentScore,
      investmentType: data.investmentType,
    }))
    setStep(3)
  }

  const handleStep3Submit = async (sectorIds: number[]) => {
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
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">회원가입</h1>
          <span className="text-sm font-semibold">{step}/3</span>

          <ProgressBar
            currentStep={step}
            totalSteps={3}
            quizProgress={step === 2 ? quizProgress : undefined}
            quizTotal={step === 2 ? 10 : undefined}
          />
        </div>

        <div className="bg-white rounded-lg border p-8 shadow-sm">
          {step === 1 && (
            <SignupStep1 data={signupData} onNext={handleStep1Next} />
          )}

          {step === 2 && (
            <SignupStep2
              onNext={handleStep2Next}
              onPrevious={() => setStep(1)}
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
