export default function HeroSection() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-8xl font-bold text-[#4A68C9] mb-3 tracking-tight">sentistock</h1>
        <div className="flex flex-col items-center gap-3 sm:gap-4 mt-10">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D8EBF7] animate-pulse" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#BADBF1] animate-pulse delay-100" />
        </div>
        <p className="text-xl sm:text-3xl font-bold md:text-3xl text-[#000000] mt-10 ">시장의 감정을 읽고</p>
        <p className="text-xl sm:text-3xl font-bold md:text-3xl text-[#000000] mt-2 ">한 걸음 앞서 투자하세요</p>
      </div>
    </div>
  )
}
