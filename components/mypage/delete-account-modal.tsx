"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAccountModal({ open, onOpenChange }: DeleteAccountModalProps) {
  const router = useRouter()

  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const confirmText = "회원탈퇴"

  const handleDelete = async () => {
    if (inputValue !== confirmText) return

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    if (!token) {
      setErrorMsg("로그인 토큰이 없습니다. 다시 로그인해 주세요.")
      return
    }

    setLoading(true)
    setErrorMsg(null)

    try {
      const res = await fetch(`${BASE_URL}/users/me/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
        cache: "no-store",
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`)
      }

      // 탈퇴 성공 → 토큰 제거
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      onOpenChange(false)
      router.replace("/login") // 또는 "/" 원하는 곳
    } catch (err: any) {
      setErrorMsg(err?.message ?? "회원 탈퇴 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = inputValue === confirmText && !loading

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">회원 탈퇴하시겠습니까?</DialogTitle>
            <button
              onClick={() => !loading && onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
              aria-label="close"
            />
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <p className="text-sm text-gray-600">
            확인을 위해 입력란에 '{confirmText}'를 입력해주세요.
          </p>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="회원탈퇴"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            disabled={loading}
          />

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={loading}
            >
              닫기
            </Button>

            <Button
              onClick={handleDelete}
              disabled={!canSubmit}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "처리 중..." : "탈퇴"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
