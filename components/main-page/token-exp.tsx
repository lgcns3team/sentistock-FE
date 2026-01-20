"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface AuthWarningDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthWarningDialog({ open, onOpenChange }: AuthWarningDialogProps) {
  const router = useRouter()

  const handleConfirm = () => {
    onOpenChange(false)
    router.push("/")
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그인이 필요합니다</AlertDialogTitle>
          <AlertDialogDescription>
            토큰이 만료되었거나 유효하지 않습니다. 로그인 후 이용해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}