import { Search } from "lucide-react"
import React from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="flex justify-center px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-lg border border-blue-300 w-full max-w-md"
        >
          <Search className="w-5 h-5 text-blue-500" />
          <input
            type="text"
            placeholder="종목명 또는 코드로 검색"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </form>
      </div>
    </div>
  )
}
