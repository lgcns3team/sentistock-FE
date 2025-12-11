"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = ["반도체", "모빌리티", "2차전지", "재생에너지", "원자력에너지"]

const stockData = [
  { name: "웨스턴디지털", price: 183.38, change: 2.11 },
  { name: "타이세미컨덕터", price: 454.53, change: 1.74 },
  { name: "TTM테크놀러지", price: 177.92, change: 1.04 },
  { name: "헤라라이닝", price: 317.62, change: -0.63 },
  { name: "킬포트시스템즈USA", price: 215.98, change: -0.74 },
  { name: "몬디로세테라퓨틱스", price: 661.53, change: 3.43 },
  { name: "인라이트라이더에너지", price: 480.84, change: 0.65 },
  { name: "퍼미티솔루션스", price: 229.11, change: -1.41 },
  { name: "에이녹스골드", price: 292.93, change: -0.85 },
]

export default function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="w-60 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto p-4 flex flex-col gap-6">
      {/* Search Bar */}
      <div className="relative">
        <Input type="text" placeholder="상세종목 검색" className="pl-10 bg-gray-100 dark:bg-gray-800 border-0" />
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">분야선택</p>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            variant={selectedCategory === category ? "default" : "ghost"}
            className={`w-full justify-start text-sm ${
              selectedCategory === category
                ? "bg-[#061F5B] text-white hover:bg-[#061F5B]/90"
                : "hover:text-[#061F5B] hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* SentiStock Logo */}
      <div className="mt-auto pt-4">
        <p className="text-gray-300 dark:text-gray-600 text-sm font-semibold text-center">SentiStock</p>
      </div>
    </div>
  )
}
