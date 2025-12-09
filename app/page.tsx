"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import HeroSection from "@/components/hero-section"
import LoginSection from "@/components/login-section"
import InvestmentStyleSection from "@/components/investment-style-section"
import FeaturesSection from "@/components/features-section"
import BrandingSection from "@/components/branding-section"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const pages = [
    { component: LoginSection, name: "Login" },
    { component: HeroSection, name: "Hero" },
    { component: InvestmentStyleSection, name: "Investment" },
    { component: FeaturesSection, name: "Features" },
    { component: BrandingSection, name: "Branding" },
  ]

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0))
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-white" onWheel={handleScroll}>
      {/* Pages Container */}
      <div
        className="flex h-screen transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${currentPage * 100}%)` }}
      >
        {pages.map((page, index) => {
          const Component = page.component
          return (
            <div key={index} className="w-full h-screen flex-shrink-0">
              <Component />
            </div>
          )
        })}
      </div>

      {/* Scroll Indicator */}
      {currentPage < pages.length - 1 && (
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-blue-600" />
        </button>
      )}

      {/* Progress Dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentPage ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
