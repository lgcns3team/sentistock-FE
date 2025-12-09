"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "admin@gmail.com",
    password: "",
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex">
        <Sidebar />

        {/* Content Area */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-8">회원정보 수정</h2>

          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">닉네임</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">비밀번호 변경</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-sm text-gray-700">비밀번호 확인</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" className="px-12 py-2 bg-transparent">
                취소
              </Button>
              <Button className="px-12 py-2 bg-gray-800 hover:bg-gray-700 text-white">수정</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
