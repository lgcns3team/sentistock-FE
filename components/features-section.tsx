export default function FeaturesSection() {
  const features = [
    {
      icon: "📋",
      title: "관심 섹터 맞춤 설정",
      description: "나에게 필요한 정보만 빠르게 확인하는 '맞춤형 투자 솔루션'",
    },
    {
      icon: "📊",
      title: "실시간 금융룩 증목 모니터링",
      description: "투자 판단에 필요한 핵심 변동 정보를 빠르고 정확하게 전달합니다.",
    },
    {
      icon: "🔥",
      title: "시장 변동 히트맵",
      description: "색상과 구성만으로 시장의 흐름을 직관적으로 파악할 수 있는 시각화 기능입니다.",
    },
  ]

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">Sentistock의 핵심 기능</h2>
        <p className="text-lg text-gray-600 text-center mb-16">
          차트, 뉴스, 감정 데이터를 유기적으로 연결해 종목의 현재 흐름과 시장의 시그널을 한눈에 파악할 수 있는 분석 중심
          화면입니다.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-sky-50 rounded-2xl p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
