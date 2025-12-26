"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

type LoginResponseDto = {
  accessToken: string
  refreshToken: string
  tokenType: string
  userId: string
  nickname: string
  investorType: string
  subscribe: boolean
  onboardingRequired: boolean
}

export default function KakaoCallbackPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState("")

  useEffect(() => {
    const code = params.get("code")
    if (!code) {
      setError("인가 코드가 없습니다.")
      return
    }

    ;(async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/auth/oauth/kakao?code=${encodeURIComponent(
            code
          )}`,
          { method: "GET" }
        )

        if (!res.ok) throw new Error("카카오 로그인 실패")

        const data = (await res.json()) as LoginResponseDto

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        localStorage.setItem("tokenType", data.tokenType)
        localStorage.setItem("subscribe", String(data.subscribe))
        localStorage.setItem("investorType", data.investorType)
        localStorage.setItem(
          "onboardingRequired",
          String(data.onboardingRequired)
        )

        if (data.onboardingRequired) {
          router.replace("/signup/kakao")
        } else {
          router.replace("/main-page")
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "카카오 로그인 실패")
      }
    })()
  }, [params, router])

  return <div className="p-6">{error || "카카오 로그인 처리 중..."}</div>
}
