export default function HeroSection() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">sentistock</h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-light">시장의 감정을 읽고,</p>
        <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light">한 걸음 앞서 투자하세요</p>

        <div className="flex justify-center gap-4 mt-12">
          <div className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-sky-300 animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-sky-300 animate-pulse delay-200" />
        </div>
      </div>
    </div>
  )
}
