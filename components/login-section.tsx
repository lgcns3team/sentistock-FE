import Image from "next/image";
import { useState } from "react"
import Link from "next/link";
import { Menu, X } from "lucide-react"

export default function LoginSection() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <div className="w-full h-screen flex flex-col relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/main-background.png)",
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col">
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

        <div className="flex-1 flex items-center px-12 overflow-hidden">
          <div className="flex-1" />
          <div className="w-80 lg:w-1/3 flex flex-col justify-center shrink-0">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-9">LOGIN</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">ID</label>
                  <input
                    type="text"
                    className="w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">PW</label>
                  <input
                    type="password"
                    className="w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    placeholder=""
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button className="w-[150px] h-[37px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-sm transition items-center justify-center">
                    로그인
                  </button>

                  <button className="py-1 transition">
                    <Image
                      src="/kakao_login_medium_narrow.png"
                      alt="kakao login"
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </button>
                </div>

                <div className="flex gap-4 text-sm text-gray-600">
                  <span>회원이 아니신가요?</span>
                  <Link href="/signup" className="text-blue-600 font-medium hover:underline transition">회원가입</Link>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <div className="flex flex-col items-center gap-1 animate-bounce">
          </div>
        </div>
      </div>
    </div>
  )
}
