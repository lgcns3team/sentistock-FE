"use client"

import type React from "react"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showPw, setShowPw] = useState(false)
  const [showPwConfirm, setShowPwConfirm] = useState(false)

  const validateNickname = (value: string) => {
    if (!value) return "닉네임을 입력해주세요"
    if (value.length < 2 || value.length > 10) return "닉네임은 2~10자"
    return ""
  }

  const validateUserId = (value: string) => {
    if (!value) return "아이디를 입력해주세요"
    if (!/^[a-zA-Z0-9]{6,12}$/.test(value)) return "아이디는 영문/숫자 6~12자"
    return ""
  }

  const validatePassword = (value: string) => {
    if (!value) return "비밀번호를 입력해주세요"
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,12}$/.test(value)) return "영문, 숫자, 특수문자 포함 8~12자"
    return ""
  }

  const validatePasswordConfirm = (value: string) => {
    if (!value) return "비밀번호 확인을 입력해주세요"
    if (value !== formData.password) return "비밀번호가 일치하지 않습니다"
    return ""
  }

  const validateEmail = (value: string) => {
    if (!value) return "이메일을 입력해주세요"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "이메일 형식이 올바르지 않습니다"
    return ""
  }

  const getPasswordStrength = (password: string) => {
    const checks = {
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^*+=-]/.test(password),
      hasLength: password.length >= 8 && password.length <= 12,
    }
    return checks
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    const nicknameError = validateNickname(formData.nickname)
    if (nicknameError) newErrors.nickname = nicknameError

    const userIdError = validateUserId(formData.userId)
    if (userIdError) newErrors.userId = userIdError

    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError

    const passwordConfirmError = validatePasswordConfirm(formData.passwordConfirm)
    if (passwordConfirmError) newErrors.passwordConfirm = passwordConfirmError

    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation if field was touched
    if (touched[name]) {
      let error = ""
      switch (name) {
        case "nickname":
          error = validateNickname(value)
          break
        case "userId":
          error = validateUserId(value)
          break
        case "password":
          error = validatePassword(value)
          // Also revalidate password confirm if it has value
          if (formData.passwordConfirm && touched.passwordConfirm) {
            const confirmError = validatePasswordConfirm(formData.passwordConfirm)
            setErrors((prev) => ({ ...prev, passwordConfirm: confirmError }))
          }
          break
        case "passwordConfirm":
          error = validatePasswordConfirm(value)
          break
        case "email":
          error = validateEmail(value)
          break
      }
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    let error = ""
    switch (name) {
      case "nickname":
        error = validateNickname(value)
        break
      case "userId":
        error = validateUserId(value)
        break
      case "password":
        error = validatePassword(value)
        break
      case "passwordConfirm":
        error = validatePasswordConfirm(value)
        break
      case "email":
        error = validateEmail(value)
        break
    }
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const PLACEHOLDER_MAP = {
    nickname: "닉네임",
    userId: "아이디",
    email: "이메일",
  } as const

  const isFieldValid = (field: string) => {
    return touched[field] && formData[field as keyof Step1Data] && !errors[field]
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="space-y-6 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">기본정보입력</h2>

      {(["nickname", "userId", "email"] as const).map((field) => (
        <div key={field} className="space-y-1.5">
          <div className="relative">
            <Input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={PLACEHOLDER_MAP[field]}
              className={cn(
                "pr-10 transition-colors",
                errors[field] && touched[field] && "border-destructive focus-visible:ring-destructive",
                isFieldValid(field) && "border-green-500 focus-visible:ring-green-500",
              )}
            />
            {touched[field] && formData[field] && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {errors[field] ? (
                  <X className="h-4 w-4 text-destructive" />
                ) : (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </div>
            )}
          </div>
          {errors[field] && touched[field] && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <X className="h-3 w-3" />
              {errors[field]}
            </p>
          )}
        </div>
      ))}

      <div className="space-y-1.5">
        <div className="relative">
          <Input
            type={showPw ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호"
            className={cn(
              "pr-10 transition-colors",
              errors.password && touched.password && "border-destructive focus-visible:ring-destructive",
              isFieldValid("password") && "border-green-500 focus-visible:ring-green-500",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Password strength indicator */}
        {touched.password && formData.password && (
          <div className="space-y-2 p-3 rounded-lg bg-muted/50 border">
            <p className="text-xs font-medium text-muted-foreground">비밀번호 요구사항</p>
            <div className="space-y-1">
              <div
                className={cn(
                  "text-xs flex items-center gap-2",
                  passwordStrength.hasLetter ? "text-green-600" : "text-muted-foreground",
                )}
              >
                {passwordStrength.hasLetter ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                영문 포함
              </div>
              <div
                className={cn(
                  "text-xs flex items-center gap-2",
                  passwordStrength.hasNumber ? "text-green-600" : "text-muted-foreground",
                )}
              >
                {passwordStrength.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                숫자 포함
              </div>
              <div
                className={cn(
                  "text-xs flex items-center gap-2",
                  passwordStrength.hasSpecial ? "text-green-600" : "text-muted-foreground",
                )}
              >
                {passwordStrength.hasSpecial ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                특수문자 포함 (!@#$%^*+=-)
              </div>
              <div
                className={cn(
                  "text-xs flex items-center gap-2",
                  passwordStrength.hasLength ? "text-green-600" : "text-muted-foreground",
                )}
              >
                {passwordStrength.hasLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                8~12자 길이
              </div>
            </div>
          </div>
        )}

        {errors.password && touched.password && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <X className="h-3 w-3" />
            {errors.password}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="relative">
          <Input
            type={showPwConfirm ? "text" : "password"}
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호 확인"
            className={cn(
              "pr-10 transition-colors",
              errors.passwordConfirm && touched.passwordConfirm && "border-destructive focus-visible:ring-destructive",
              isFieldValid("passwordConfirm") && "border-green-500 focus-visible:ring-green-500",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPwConfirm(!showPwConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPwConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.passwordConfirm && touched.passwordConfirm && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <X className="h-3 w-3" />
            {errors.passwordConfirm}
          </p>
        )}
        {isFieldValid("passwordConfirm") && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <Check className="h-3 w-3" />
            비밀번호가 일치합니다
          </p>
        )}
      </div>

      <Button onClick={() => validateForm() && onNext(formData)} className="w-full h-12 font-semibold">
        다음
      </Button>
    </div>
  )
}