"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function SignupIndexPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!

  const KAKAO_AUTH_URL =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${KAKAO_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    "&response_type=code"

  return (
    <main className="min-h-screen bg-background">
             {/* Header */}
        <header className="relative bg-white border-b border-gray-200 px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SentiStock Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/service-info" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              회사소개
            </Link>
            <Link href="/notice" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              공지사항
            </Link>
            <Link href="/customer-center" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              고객센터
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              자주 묻는 질문
            </Link>
          </nav>
          {/* Right icons */}
          <div className="flex items-center gap-4 ml-6">
            {/* 모바일 햄버거 */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMobileMenuOpen && (
            <div
              className="absolute top-full left-0 w-full h-screen bg-black/40 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-screen bg-white shadow-lg z-50">
              <nav className="flex flex-col divide-y">
                <Link
                  href="/service-info"
                  className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  회사소개
                </Link>
                <Link
                  href="/notice"
                  className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  공지사항
                </Link>
                <Link
                  href="/customer-center"
                  className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  고객센터
                </Link>
                <Link
                  href="/faq"
                  className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  자주 묻는 질문
                </Link>
              </nav>
            </div>
          )}
        </header>
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="max-w-xl mx-auto mt-18 text-center">
          <h1 className="text-3xl font-bold text-[#000000] mb-5">회원가입</h1>

          <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
            <div className="space-y-6">

              {/* sentistock signup */}
              <button
                onClick={() => router.push("/signup/sentistock")}
                className="w-full bg-primary hover:bg-[#004280] text-white py-2.5 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
              >
                <Image
                  src="/sentistock-white.png"
                  alt="sentistock"
                  width={120}
                  height={28}
                  priority
                />
                <span>회원가입</span>
              </button>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground">간편 회원가입</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* kakao signup */}
              <button
                onClick={() => { window.location.href = KAKAO_AUTH_URL }}
                className="relative w-full bg-[#FFE812] hover:bg-[#FFD800] text-black py-2.5 px-6 rounded-lg font-semibold text-lg transition-colors text-center"
              >
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <Image
                    src="/kakao-logo.png"
                    alt="kakao"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <span>카카오톡 간편 회원가입</span>
              </button>

            </div>
          </div>
        </div>

      </div>
    </main>
  )
}