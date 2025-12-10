interface HeroSectionProps {
  imageSrc: string
}

export default function HeroSection({ imageSrc }: HeroSectionProps) {
  return (
    <div className="w-full h-48 overflow-hidden bg-gradient-to-r from-blue-900 to-blue-600">
      <img src={imageSrc || "/placeholder.svg"} alt="서비스 소개" className="w-full h-full object-cover" />
    </div>
  )
}
