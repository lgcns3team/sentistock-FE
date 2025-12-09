"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Step1Data {
  nickname: string
  userId: string
  password: string
  passwordConfirm: string
  email: string
}

interface SignupStep1Props {
  data: Step1Data
  onNext: (data: Step1Data) => void
}

export default function SignupStep1({ data, onNext }: SignupStep1Props) {
  const [formData, setFormData] = useState(data)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nickname.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요"
    }
    if (!formData.userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요"
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요"
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다"
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다"
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "유효한 이메일을 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 입력 시 에러 제거
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">기본정보입력</h2>
      </div>

      <div className="space-y-5">
        {/* 닉네임 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">닉네임</label>
          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
            className={`bg-input border-border focus:ring-primary ${errors.nickname ? "border-red-500" : ""}`}
          />
          {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
        </div>

        {/* 아이디 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">아이디</label>
          <Input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="아이디를 입력해주세요"
            className={`bg-input border-border focus:ring-primary ${errors.userId ? "border-red-500" : ""}`}
          />
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">비밀번호</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            className={`bg-input border-border focus:ring-primary ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">비밀번호 확인</label>
          <Input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력해주세요"
            className={`bg-input border-border focus:ring-primary ${errors.passwordConfirm ? "border-red-500" : ""}`}
          />
          {errors.passwordConfirm && <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm}</p>}
        </div>

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">이메일</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            className={`bg-input border-border focus:ring-primary ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-6">
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12"
        >
          다음
        </Button>
      </div>
    </div>
  )
}
