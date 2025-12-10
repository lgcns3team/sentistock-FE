"use client"

import { useState } from "react"
// import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAccountModal({ open, onOpenChange }: DeleteAccountModalProps) {
  const [inputValue, setInputValue] = useState("")
  const confirmText = "회원탈퇴"

  const handleDelete = () => {
    if (inputValue === confirmText) {
      // Handle account deletion
      console.log("Account deleted")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">회원 탈퇴하시겠습니까?</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <p className="text-sm text-gray-600">확인을 위해 입력란에 '{confirmText}'를 입력해주세요.</p>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="회원탈퇴"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              닫기
            </Button>
            <Button
              onClick={handleDelete}
              disabled={inputValue !== confirmText}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              입력
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
