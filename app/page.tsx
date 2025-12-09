"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import LoginSection from "@/components/login-section"
import HeroSection from "@/components/hero-section"
import InvestmentStyleSection from "@/components/investment-style-section"
import FeaturesSection from "@/components/features-section"
import BrandingSection from "@/components/branding-section"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  const pages = [
    { component: LoginSection, name: "Login" },
    { component: HeroSection, name: "Hero" },
    { component: InvestmentStyleSection, name: "Investment" },
    { component: FeaturesSection, name: "Features" },
    { component: BrandingSection, name: "Branding" },
  ]

  const handleScroll = (e: WheelEvent) => {
    if (isScrolling.current) return

    isScrolling.current = true
    setTimeout(() => {
      isScrolling.current = false
    }, 800)

    e.preventDefault()
    if (e.deltaY > 0) {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0))
    }
  }

  const handleDotClick = (index: number) => {
    isScrolling.current = true
    setCurrentPage(index)
    setTimeout(() => {
      isScrolling.current = false
    }, 500)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", handleScroll, { passive: false })
    return () => container.removeEventListener("wheel", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative bg-white w-screen h-screen overflow-hidden">
      <div
        className="flex flex-col transition-transform duration-500 ease-out w-screen"
        style={{
          transform: `translateY(-${currentPage * 100}vh)`,
          height: `${pages.length * 100}vh`,
        }}
      >
        {pages.map((page, index) => {
          const Component = page.component
          return (
            <div key={index} className="w-screen h-screen flex-shrink-0 overflow-hidden">
              <Component />
            </div>
          )
        })}
      </div>

      {/* Scroll Indicator */}
      {currentPage < pages.length - 1 && (
        <button
          onClick={() => handleDotClick(currentPage + 1)}
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
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentPage ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
