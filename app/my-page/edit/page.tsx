"use client"

import { useEffect, useState } from "react"
import Link from "next/link" // 계정 보안 탭으로 이동
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

type Provider = "LOCAL" | "KAKAO"

interface User {
  name: string
  nickname: string
  email: string
  provider: Provider
}

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setUser({
      name: "admin",
      nickname: "관리자",
      email: "admin@gmail.com",
      provider: "KAKAO", // LOCAL or KAKAO
    })
  }, [])

  useEffect(() => {
    if (!user) return
    setFormData(prev => ({
      ...prev,
      name: user.name ?? "",
      nickname: user.nickname ?? "",
      email: user.email ?? "",
    }))
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8">로딩 중...</div>
        </div>
      </div>
    )
  }

  const isKakao = user.provider === "KAKAO"

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value })
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isKakao && formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    alert("회원정보가 수정되었습니다. (실제에선 API 호출)")
  }

  const handleCancel = () => {
    setFormData({
      name: user.name ?? "",
      nickname: user.nickname ?? "",
      email: user.email ?? "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-8">회원정보 수정</h2>

          {isKakao && (
            <p className="mb-6 text-sm text-gray-500">
              이 계정은 <span className="font-semibold">카카오 로그인</span>으로 사용 중이에요. <br />
              기본 계정 정보는 카카오에서만 변경할 수 있어요.
            </p>
          )}

          <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
            {/* 이름 */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 닉네임 */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">닉네임</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={handleChange("nickname")}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 이메일 (모든 로그인 타입에서 수정 불가) */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이메일</label>
              <input
                type="email"
                value={formData.email}
                readOnly
                disabled
                className="flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-col items-end gap-2 pt-4">
              {/* 윗줄: 취소 / 수정 버튼 */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="px-12 py-2 bg-transparent"
                  onClick={handleCancel}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="px-12 py-2 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  수정
                </Button>
              </div>

              {/* 아랫줄: 비밀번호 변경 안내 + 링크 */}
              <p className="mt-7 text-xs text-gray-500">
                비밀번호 변경이 필요하신가요?{" "}
                <Link
                  href="/my-page/security"
                  className="text-blue-600 hover:text-blue-700"
                >
                  비밀번호 변경
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
