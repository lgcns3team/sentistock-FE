// app/my-page/page.tsx
"use client"

import { useEffect, useState } from "react"
import InvestorProfileCard from "@/components/investor-profile-card"

const BASE_URL = "http://localhost:8080"

type MyInfo = {
  userId: string
  nickname: string
  userEmail: string
  investorType?: string
}

export default function MyPageInfoPage() {
  const [me, setMe] = useState<MyInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken") // 너희 토큰 키로 맞추기
    if (!token) {
      setError("토큰이 없어서 내 정보를 불러올 수 없음")
      return
    }

    const fetchMe = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`${res.status} ${text}`)
        }

        const data = (await res.json()) as MyInfo
        setMe(data)
      } catch (e: any) {
        setError(e?.message ?? "내 정보 조회 실패")
      }
    }

    fetchMe()
  }, [])

  return (
    <div className="flex-1 px-10 py-8">
      <div className="">
        <section className="mb-10">
          <h2 className="mb-8 text-xl font-semibold">회원정보 조회</h2>

          {error && (
            <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!me ? (
            <div className="text-sm text-gray-500">불러오는 중...</div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">아이디</label>
                <div className="flex-1 rounded border border-gray-300 bg-gray-50 px-4 py-2">
                  {me.userId}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">닉네임</label>
                <div className="flex-1 rounded border border-gray-300 bg-gray-50 px-4 py-2">
                  {me.nickname}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-24 text-sm text-gray-700">이메일</label>
                <div className="flex-1 rounded border border-gray-300 bg-gray-50 px-4 py-2">
                  {me.userEmail}
                </div>
              </div>
            </div>
          )}
        </section>

        <section>
          <h3 className="mb-4 text-sm font-semibold text-gray-800">
            투자 성향 정보
          </h3>

          <div className="[&>div]:w-full [&>div]:max-w-none [&>div]:mx-0">
            <InvestorProfileCard investorType={me?.investorType} />
          </div>
        </section>
      </div>
    </div>
  )
}
