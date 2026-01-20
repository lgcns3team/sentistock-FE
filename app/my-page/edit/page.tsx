"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Provider = "KAKAO" | null

type MeResponse = {
  userId: string
  nickname: string
  userEmail: string
  provider: Provider
}

type User = {
  name: string
  nickname: string
  email: string
  provider: Provider
}

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    if (!token) {
      setLoading(false)
      return
    }

    const fetchMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        })

        if (!res.ok) throw new Error(await res.text())

        const data = (await res.json()) as MeResponse

        const mapped: User = {
          name: data.userId,
          nickname: data.nickname,
          email: data.userEmail,
          provider: data.provider,
        }

        setUser(mapped)
        setFormData((prev) => ({
          ...prev,
          name: mapped.name ?? "",
          nickname: mapped.nickname ?? "",
          email: mapped.email ?? "",
          password: "",
          confirmPassword: "",
        }))

        // A 방식: 초기 로딩 시에도 profileNickname 저장(동기화)
        localStorage.setItem("profileNickname", mapped.nickname)
        window.dispatchEvent(new Event("profile-updated"))

        const savedImage = localStorage.getItem("profileImage")
        if (savedImage) {
          setProfileImage(savedImage)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setProfileImage(result)
        localStorage.setItem("profileImage", result)
        window.dispatchEvent(new Event("profile-updated"))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    localStorage.removeItem("profileImage")
    window.dispatchEvent(new Event("profile-updated"))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (loading) {
    return <div className="flex-1 px-10 py-8">로딩 중...</div>
  }

  if (!user) {
    return <div className="flex-1 px-10 py-8">사용자 정보를 불러오지 못했습니다.</div>
  }

  const isKakao = user.provider === "KAKAO"
  const providerLabel = isKakao ? "카카오 로그인" : "센티스톡 로그인"

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    if (!token) {
      alert("로그인이 필요합니다.")
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname: formData.nickname }),
        cache: "no-store",
      })

      if (!res.ok) throw new Error(await res.text())

      const updated = (await res.json()) as MeResponse

      const mapped: User = {
        name: updated.userId,
        nickname: updated.nickname,
        email: updated.userEmail,
        provider: updated.provider,
      }

      setUser(mapped)
      setFormData((prev) => ({
        ...prev,
        name: mapped.name ?? "",
        nickname: mapped.nickname ?? "",
        email: mapped.email ?? "",
        password: "",
        confirmPassword: "",
      }))

      // A 방식: 닉네임 변경 성공 시, UI 표시용 닉네임 저장 + 전역 갱신 이벤트 발사
      localStorage.setItem("profileNickname", mapped.nickname)
      window.dispatchEvent(new Event("profile-updated"))

      alert("수정 완료되었습니다.")
    } catch (err: any) {
      console.error(err)
      alert(err?.message ?? "닉네임 수정 실패")
    }
  }

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      name: user.name ?? "",
      nickname: user.nickname ?? "",
      email: user.email ?? "",
      password: "",
      confirmPassword: "",
    }))
  }

  return (
    <div className="flex-1 px-10 py-8">
      <h2 className="mb-8 text-xl font-semibold">회원정보 수정</h2>

      <p className="mb-6 text-sm text-gray-500">
        이 계정은 <span className="font-semibold">{providerLabel}</span>으로 사용 중이에요.{" "}
        <br />
        이곳에서 닉네임을 수정할 수 있어요.
      </p>

      <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="프로필 이미지"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl text-gray-400">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleImageButtonClick}
                className="bg-transparent text-sm"
              >
                이미지 변경
              </Button>
              {profileImage && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  이미지 삭제
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500">JPG, PNG (최대 5MB)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">아이디</label>
          <input
            type="text"
            value={formData.name}
            readOnly
            disabled
            className="flex-1 cursor-not-allowed rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">닉네임</label>
          <input
            type="text"
            value={formData.nickname}
            onChange={handleChange("nickname")}
            className="flex-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-700">이메일</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            disabled
            className="flex-1 cursor-not-allowed rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-500"
          />
        </div>

        <div className="flex flex-col items-end gap-2 pt-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent px-12 py-2"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="bg-gray-800 px-12 py-2 text-white hover:bg-gray-700"
            >
              수정
            </Button>
          </div>

          <p className="mt-7 text-xs text-gray-500">
            비밀번호 변경이 필요하신가요?{" "}
            <Link href="/my-page/security" className="text-blue-600 hover:text-blue-700">
              비밀번호 변경
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
