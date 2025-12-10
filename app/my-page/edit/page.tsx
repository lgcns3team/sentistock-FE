"use client"

import { useEffect, useState } from "react"
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
  // 실제로는 여기서 /api/me 같은 곳에서 유저 정보 가져오면 됨
  const [user, setUser] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    // 👉 TODO: 나중에 실제 API 호출로 교체
    // provider를 "KAKAO" 로 바꾸면 카카오 로그인 화면 모양 확인 가능
    setUser({
      name: "admin",
      nickname: "관리자",
      email: "admin@gmail.com",
      provider: "KAKAO", // or "KAKAO"
    })
  }, [])

  // user 정보 들어오면 form에 초기값 세팅
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

    // 간단 예시: 비밀번호 검증
    if (!isKakao && formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }

    // 👉 TODO: 여기에 실제 업데이트 API 호출
    // fetch("/api/me", { method: "PUT", body: JSON.stringify(formData) ... })

    alert("회원정보가 수정되었습니다. (실제에선 API 호출)")
  }

  const handleCancel = () => {
    // 취소 시, user 기준으로 다시 초기화
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
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex">
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-2">회원정보 수정</h2>

          {isKakao && (
            <p className="mb-6 text-sm text-gray-500">
              이 계정은 <span className="font-semibold">카카오 로그인</span>으로 사용 중이에요. <br />
              이메일 등 기본 계정 정보는 카카오에서만 변경할 수 있어요.
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

            {/* 이메일 (카카오는 수정 불가) */}
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                disabled={isKakao}
                className={`flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isKakao ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                }`}
              />
            </div>

      

            <div className="flex justify-end gap-4 pt-4">
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
          </form>
        </div>
      </div>
    </div>
  )
}
