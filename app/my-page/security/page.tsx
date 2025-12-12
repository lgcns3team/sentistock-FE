"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Provider = "LOCAL" | "KAKAO"

interface User {
  name: string
  email: string
  provider: Provider
}

export default function AccountSecurityPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser({
      name: "admin",
      email: "admin@gmail.com",
      provider: "LOCAL",
    })
  }, [])

  if (!user) {
    return (
      <div className="flex-1 px-10 py-8">
        로딩 중...
      </div>
    )
  }

  const isKakao = user.provider === "KAKAO"
  const emailConnected = !isKakao
  const kakaoConnected = isKakao

  return (
    // 알림 설정과 동일한 레이아웃 뼈대
    <div className="flex-1 px-10 py-8">
      <h2 className="mb-2 text-xl font-semibold">계정 보안</h2>
      <p className="mb-8 text-sm text-gray-500">
        로그인 방식, 비밀번호, 최근 접속 기록 등을 관리할 수 있어요.
      </p>

      {/* 알림 설정과 동일한 컨텐츠 래퍼 */}
      <div className="max-w-4xl space-y-12">
        {/* Section 1: 로그인 방식 */}
        <section className="space-y-4">
          {/* 이메일 / 비밀번호 로그인 */}
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
            <Button variant="link" className="text-blue-600">
              {emailConnected ? "비밀번호 변경" : "연결하기"}
            </Button>
          </div>

          {/* 카카오 로그인 */}
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
            <Button variant="link" className="text-blue-600">
              연결 관리
            </Button>
          </div>
        </section>

        {/* Section 2: 비밀번호 변경 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">비밀번호 변경</h3>
          </div>

          <div className="max-w-xl space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                현재 비밀번호
              </Label>
              <Input
                type="password"
                disabled={isKakao}
                className={`border-gray-300 ${
                  isKakao ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                새 비밀번호
              </Label>
              <Input
                type="password"
                disabled={isKakao}
                className={`border-gray-300 ${
                  isKakao ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                새 비밀번호 확인
              </Label>
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
                  isKakao
                    ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                    : ""
                }`}
                disabled={isKakao}
              >
                비밀번호 변경
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: 2단계 인증 */}
        <section className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <Label className="text-sm font-medium">2단계 인증 사용</Label>
              <p className="text-sm text-gray-500">
                로그인 시 추가 인증 단계를 거쳐 보안을 강화해요.
              </p>
            </div>
            <Switch />
          </div>
        </section>

        {/* Section 4: 최근 접속 기록 */}
        <section>
          <h3 className="mb-4 text-sm font-semibold">최근 접속 기록</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    접속 일시
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    기기
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    IP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm">2025-01-15 14:32</td>
                  <td className="px-4 py-3 text-sm">Chrome (Windows)</td>
                  <td className="px-4 py-3 text-sm">192.168.1.1</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                      활성
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm">2025-01-14 09:15</td>
                  <td className="px-4 py-3 text-sm">Safari (Mac)</td>
                  <td className="px-4 py-3 text-sm">192.168.1.2</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      종료됨
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: 모든 기기 로그아웃 */}
        <section className="pt-2">
          <Button variant="link" className="text-red-600 hover:text-red-700">
            모든 기기에서 로그아웃
          </Button>
        </section>
      </div>
    </div>
  )
}
