"use client"

import { useRouter } from "next/navigation"
import  Header from "@/components/header"
import { Search } from "lucide-react"
import Image from "next/image"

export default function CustomerCenter() {
  const router = useRouter()

  const handleSearchClick = () => {
    router.push("/faq")
  }

  const categories = [
    { label: "밸류체인" },
    { label: "시장분석" },
    { label: "감정분석" },
    { label: "투자성향" },
    { label: "센티스톡" },
  ]

  return (
    <main>
      <Header />

      <div className="min-h-screen flex justify-center px-4" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="text-center max-w-2xl">
          {/* Decorative Avatar */}
          <div className="flex justify-center mb-8 mt-25">
            <Image src="/question-mark-icon.png" alt="Help Icon" width={96} height={96} priority />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-bold mb-8" style={{ color: "#004996" }}>
            무엇을 도와드릴까요?
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <button
              onClick={handleSearchClick}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-full bg-white border-2 cursor-pointer hover:shadow-md transition-shadow"
              style={{ borderColor: "#98C9EA" }}
            >
              <Search className="w-5 h-5 flex-shrink-0" style={{ color: "#5CB4E4" }} />
              <span className="flex-1 text-left text-gray-500">궁금한 점을 검색해보세요</span>
            </button>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => router.push("/faq")}
                className="px-6 py-2 rounded-full font-medium transition-all hover:shadow-md"
                style={{
                  backgroundColor: "#E8F4FB",
                  color: "#004996",
                  border: "1px solid #98C9EA",
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
