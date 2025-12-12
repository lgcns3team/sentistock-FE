"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="rounded-lg overflow-hidden border transition-all"
      style={{
        borderColor: isOpen ? "#5CB4E4" : "#E8F4FB",
        backgroundColor: "#FFFFFF",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-opacity-50 transition-colors"
        style={{
          backgroundColor: isOpen ? "#F0F8FD" : "#FFFFFF",
        }}
      >
        <ChevronDown
          className="w-6 h-6 flex-shrink-0 mt-0.5 transition-transform duration-300"
          style={{
            color: "#5CB4E4",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
        <span className="font-medium text-lg" style={{ color: "#004996" }}>
          {question}
        </span>
      </button>

      {isOpen && (
        <div
          className="px-6 py-4 border-t"
          style={{
            borderColor: "#E8F4FB",
            backgroundColor: "#F9FCFE",
            color: "#333333",
          }}
        >
          <p className="leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
