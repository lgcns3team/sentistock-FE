"use client"

import type React from "react"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface Step1Data {
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
  const [formData, setFormData] = useState<Step1Data>(data)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPw, setShowPw] = useState(false)
  const [showPwConfirm, setShowPwConfirm] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nickname || formData.nickname.length < 2 || formData.nickname.length > 10)
      newErrors.nickname = "닉네임은 2~10자"

    if (!/^[a-zA-Z0-9]{6,12}$/.test(formData.userId))
      newErrors.userId = "아이디는 영문/숫자 6~12자"

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,12}$/.test(formData.password))
      newErrors.password = "비밀번호 형식이 올바르지 않습니다"

    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다"

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "이메일 형식이 올바르지 않습니다"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const PLACEHOLDER_MAP = {
    nickname: "닉네임",
    userId: "아이디",
    email: "이메일",
  } as const

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">기본정보입력</h2>

      {(["nickname", "userId", "email"] as const).map((field) => (
        <div key={field}>
          <Input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={PLACEHOLDER_MAP[field]}
            className={errors[field] ? "border-red-500" : ""}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field]}</p>
          )}
        </div>
      ))}

      {/* 비밀번호 */}
      <Input
        type={showPw ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />

      {/* 비밀번호 확인 */}
      <Input
        type={showPwConfirm ? "text" : "password"}
        name="passwordConfirm"
        value={formData.passwordConfirm}
        onChange={handleChange}
        placeholder="비밀번호 확인"
      />

      <Button
        onClick={() => validateForm() && onNext(formData)}
        className="w-full h-12"
      >
        다음
      </Button>
    </div>
  )
}
