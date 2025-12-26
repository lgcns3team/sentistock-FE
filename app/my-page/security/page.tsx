"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Provider = "KAKAO" | null

type User = {
  nickname: string
  userEmail: string
  provider: Provider
}

export default function AccountSecurityPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) return

    const fetchMe = async () => {
      const res = await fetch("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = (await res.json()) as User
      setUser(data)
    }

    fetchMe()
  }, [])

  if (!user) {
    return <div className="flex-1 px-10 py-8">로딩 중...</div>
  }

  const isKakao = user.provider === "KAKAO"
  const emailConnected = !isKakao
  const kakaoConnected = isKakao

  return (
    <div className="flex-1 px-10 py-8">
      <h2 className="mb-2 text-xl font-semibold">계정 보안</h2>
      <p className="mb-8 text-sm text-gray-500">
        로그인 방식, 비밀번호, 최근 접속 기록 등을 관리할 수 있어요.
      </p>

      <div className="max-w-4xl space-y-12">
        <section className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">이메일 / 비밀번호</p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${
                  emailConnected
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {emailConnected ? "연결됨" : "미연결"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
            <div>
              <p className="text-sm font-medium">카카오 로그인</p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${
                  kakaoConnected
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {kakaoConnected ? "연결됨" : "미연결"}
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">비밀번호 변경</h3>
          </div>

          <div className="max-w-xl space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">현재 비밀번호</Label>
              <Input
                type="password"
                disabled={isKakao}
                className={`border-gray-300 ${
                  isKakao ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">새 비밀번호</Label>
              <Input
                type="password"
                disabled={isKakao}
                className={`border-gray-300 ${
                  isKakao ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">새 비밀번호 확인</Label>
              <Input
                type="password"
                disabled={isKakao}
                className={`border-gray-300 ${
                  isKakao ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>

            {isKakao && (
              <p className="text-xs text-gray-500">
                카카오 로그인 계정은 비밀번호를 이곳에서 변경할 수 없어요.
              </p>
            )}

            <div className="flex justify-end">
              <Button
                className={`bg-[#172B4D] hover:bg-[#0f1f35] text-white ${
                  isKakao ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={isKakao}
              >
                비밀번호 변경
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
