export default function InvestmentStyleSection() {
  return (
    <div className="w-full h-screen bg-sky-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl font-bold text-gray-900 mb-4 text-center">나는 어떤 투자 스타일일까?</h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          멋 가지 질문만으로 나의 투자 성향을 쉽게 파악할 수 있어요.
        </p>

        <div className="bg-white rounded-3xl p-12 shadow-lg max-w-2xl mx-auto">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">회원가입</h3>
            <div className="flex gap-2 flex-wrap">
              {["섹터1", "섹터2", "섹터3", "섹터4", "섹터5"].map((sector) => (
                <span key={sector} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-12">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-blue-100 rounded-lg hover:bg-blue-200 transition cursor-pointer"
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">투자 성향 결과</p>
            </div>

            <div className="p-4 border-2 border-blue-200 rounded-lg">
              <p className="text-gray-600">안정형</p>
              <p className="text-sm text-gray-500 mt-1">(ex. 적극투자형)</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">간단한 투자 성향 설명</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
              이전
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              다음 {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
