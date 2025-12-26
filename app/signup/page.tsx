"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Image from "next/image"

export default function SignupIndexPage() {
  const router = useRouter()

  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!

  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${KAKAO_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    "&response_type=code"

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="max-w-xl mx-auto mt-18 text-center">
          <h1 className="text-3xl font-bold text-[#000000] mb-5">회원가입</h1>

          <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
            <div className="space-y-6">

              {/* sentistock signup */}
              <button
                onClick={() => router.push("/signup/sentistock")}
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

              {/* kakao signup */}
              <button
                onClick={() => { window.location.href = KAKAO_AUTH_URL }}
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

      </div>
    </main>
  )
}