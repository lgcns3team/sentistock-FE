export default function HeroSection() {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-[150px] font-bold text-[#4A68C9] mb-3 tracking-tight">sentistock</h1>
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="w-4 h-4 rounded-full bg-[#D8EBF7] animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-[#BADBF1] animate-pulse delay-100" />
        </div>
        <p className="text-2xl font-bold md:text-3xl text-[#000000] mb-4 mt-12 ">시장의 감정을 읽고</p>
        <p className="text-2xl font-bold md:text-3xl text-[#000000] mb-12 ">한 걸음 앞서 투자하세요</p>
      </div>
    </div>
  )
}
