export default function BrandingSection() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-block mb-8">
          <div className="text-6xl font-bold text-blue-600 tracking-tight">sentistock</div>
        </div>

        <div className="my-12">
          <div className="w-1 h-1 rounded-full bg-blue-300 mx-auto mb-6" />
          <div className="w-1 h-1 rounded-full bg-blue-300 mx-auto mb-6" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">시장의 감정을 읽고,</h2>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">한 걸음 앞서 투자하세요</h2>

        <p className="text-gray-600 text-lg mt-12 max-w-2xl mx-auto leading-relaxed">
          Sentistock은 투자자들이 필요로 하는 정보를 정확하고 효율적으로 제공하는 AI 기반 투자 분석 플랫폼입니다.
        </p>

        <button className="mt-16 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition">
          지금 시작하기
        </button>
      </div>
    </div>
  )
}
