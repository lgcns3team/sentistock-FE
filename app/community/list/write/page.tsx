"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon } from "lucide-react"

export default function WritePage() {
  const router = useRouter()
  const [stock, setStock] = useState("삼성전자")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<File[]>([])

  const [isWriteDoneOpen, setIsWriteDoneOpen] = useState(false)
  const openWriteConfirm = () => setIsWriteDoneOpen(true)
  const closeWriteDone = () => setIsWriteDoneOpen(false)

  const handleSubmit = () => {
    console.log("[v0] 게시글 작성:", { stock, title, content, images })
    router.push("/community/list")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setImages([...images, ...Array.from(files)])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const isFormValid = title.trim() && content.trim()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">삼성전자</h1>
            <span className="text-lg font-semibold text-gray-900">글쓰기</span>
          </div>
          <Button
            onClick={openWriteConfirm}
            disabled={!isFormValid}
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 hover:bg-transparent font-semibold disabled:text-gray-300"
          >
            등록하기
          </Button>
        </div>
      </header>

      <div className="bg-white mt-2">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs text-gray-400">
            욕설, 비방, 허위사실 유포 등은 제재 대상이 될 수 있습니다. 아래 사항을 확인해 주세요.<br />
	          •	욕설·비방·혐오/차별 표현은 금지됩니다.<br />
	          •	근거 없는 루머/허위사실(찌라시 포함) 유포는 제재될 수 있습니다.<br />
	          •	개인정보(연락처·계좌·주소 등) 노출 및 타인 정보 공유는 금지됩니다.<br />
	          •	광고/홍보/도배(리딩방·유료방 유도, 링크 반복 포함)는 제한됩니다.<br />
	          •	저작권 침해(기사 전문 복사 등) 게시물은 삭제될 수 있습니다.<br />
	          •	투자 판단과 책임은 본인에게 있습니다.</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-100">
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 p-0 text-base font-medium placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-4">
          <label htmlFor="image-upload" className="cursor-pointer">
            <ImageIcon className="h-6 w-6 text-gray-600 hover:text-gray-900 transition-colors" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          {images.length > 0 && <span className="text-sm text-gray-500">이미지 {images.length}개</span>}
        </div>

        <div className="px-4 py-4">
          <Textarea
            placeholder="자유롭게 의견을 남겨보세요!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] border-0 p-0 text-base placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
          />
        </div>
        {isWriteDoneOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-m font-semibold text-foreground">글이 등록됐습니다</h2>

            <div className="mt-5 flex justify-end">
              <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
