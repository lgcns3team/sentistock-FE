import { Button } from "@/components/ui/button"
import  Header from "@/components/header"
import Image from "next/image";

export default function ServiceIntro() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content - Scrollable Sections */}
      <main className="max-w-6xl mx-auto">
        {/* Section 1: Title and Introduction */}
        <section id="about" className="px-6 py-20 scroll-mt-16">
          <h1 className="text-4xl font-bold text-foreground mb-10">회사소개</h1>
          <div className="w-full h-px bg-gray-200 mb-10"></div>
          <div className=" text-center space-y-6 mb-16">
            <h2 className="text-2xl font-bold">
              <span className="text-[#0065F4]">감정 데이터</span>
              {" "}로 투자자의 확신을 높이고, 더 나은 선택을 돕습니다.
            </h2>
            <p className="text-[#999999] text-lg">숫자에 감정을 더한, 새로운 투자 의사결정 파트너</p>
          </div>
        </section>

        {/* Section 2: Company Goals */}
        <section className="px-6 py-5">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-foreground">회사 목표</h2>

            <div className="space-y-4 text-[#757282] max-w-3xl mx-auto">
              <p className="text-lg">
                우리는 단기 수익보다 <span className="font-bold text-blue-600">지속 가능한 투자 경험</span>을 더
                중요하게 생각합니다.
              </p>
              <p className="text-lg">개인 투자자가 불완전한 정보와 감정에 흔들리지 않고,</p>
              <p className="text-lg">
                <span className="font-bold text-blue-600">데이터와 검증된 전략</span>을 바탕으로
              </p>
              <p className="text-lg">스스로 결정할 수 있는 환경을 만드는 것이 우리의 목표입니다.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Values */}
        <section className="px-6 py-30">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">우리의 가치</h2>
          </div>

          {/* Values Grid */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Value 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">1. 데이터에 기반한 '근거 있는 선택'</h3>
                <p className="text-gray-700 leading-relaxed">
                  우리는 "느낌"이 아닌 <span className="font-bold">수치적 기준</span>으로 믿읍니다. 진정한 수익을 높을,
                  최저 순위, 변동성, 적정 기기까지 투자자가 스스로 톱준 투자자가 스스로 큰 의도를 듣습니다.
                </p>
              </div>
              
            </div>

            {/* Value 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">2. '자족 가능한 투자 습관'</h3>
                <p className="text-gray-700 leading-relaxed">
                  오늘 하 번의 우의인 아니라, 10년 뒤에 계속 투자할 수 있는 계약과 습관을 위하여 감정의 페터닝을
                  이해하고 그 인에서 나만의 원칙을 지켜나는 연습을 돕습니다.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  3. 누구나 이해할 수 있는 '실고 진정한 투자 정략'
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  복잡한 옮인 니세인 차트 데이터, <span className="font-bold">모기 차원 지표야로</span>
                  투자 전략의 진정 정책에 높습니다. 자족 투자자는 시님도, 이머 경험이 있는 자신의{" "}
                  <span className="font-bold">진칙을 찾을 설계하고 활용할 수</span> 있습니다.
                </p>
              </div>
              
            </div>

            {/* Value 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">4. 투명성과 정직함</h3>
                <p className="text-gray-700 leading-relaxed">
                  원 나은 결과면 너비조 않습니다. 불릴인 구근, 손실이 없던 시기, 전략의 근린지 페인트한 시점에서 투자에
                  가장 폐르스는 "모든 것"이라고 믿기 때문입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Vision and Mission */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-3xl">
              💡
            </div>
            <h2 className="text-4xl font-bold text-foreground">비전 및 목표</h2>

            <div className="space-y-4 text-gray-700 max-w-3xl mx-auto">
              <p className="text-lg">
                우리는 "준치 하는 투자자"를 <span className="font-bold text-blue-600">"함께 감정하는 투자자"</span>로
                바꾸자 합니다.
              </p>
              <p className="text-lg">더 많은 개인 투자자가 데이터 시플레이션을 통해</p>
              <p className="text-lg">자신의 전략을 감정하고,</p>
              <p className="text-lg">스스로의 투자 정책을 맞들어가는 과정에서 확신을 갖춤으로써</p>
              <p className="text-lg">
                <span className="font-bold text-blue-600">더 나은 선택</span>이 자연스럽게 따라올 것이라 믿습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Portfolio Analysis CTA */}
        <section className="px-6 py-20 bg-gradient-to-br from-white via-blue-300 to-cyan-200">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <div className="text-5xl">🛠️</div>
            </div>

            <h2 className="text-3xl font-bold text-white">
              뉴스, 차트, 수냥은 지표 속에서 "지금 무엇을 믿어야 할지" 마칭했던 순간들.
            </h2>

            <div className="space-y-4 text-white/90 text-lg">
              <p>우리는 그 질문에 담하기 위해,</p>
              <p>
                우리 서비스를 기반으로 수행된 <span className="font-bold">백테스트 및 모의투자 시뮬레이션 결과</span>를
                데이터 중심의 포트폴리오 리포트로 담아냈습니다.
              </p>
            </div>

            <div className="space-y-3 text-white/90">
              <p>실제 시장 데이터를 바탕으로 전략이 어떻게 작동했는지,</p>
              <p>모의투자 과정에서 어떤 흐름과 성과가 나타났는지,</p>
              <p className="font-bold text-white">감(感)이 아닌 검증된 데이터 기반의 투자 인사이트를 제공합니다.</p>
            </div>

            <div className="pt-4">
              <p className="text-white/90 mb-6">
                지금, 당신의 투자 여정을 더 선명하게 비춰줄 <span className="font-bold">포트폴리오 분석 페이지</span>로
                이동해보세요.
              </p>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold text-lg">
                → 포트폴리오 분석 페이지
              </Button>
            </div>
          </div>
        </section>

        {/* Footer Spacing */}
        <section className="px-6 py-12"></section>
      </main>
    </div>
  )
}
