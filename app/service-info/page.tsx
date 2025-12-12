import { Button } from "@/components/ui/button"
import  Header from "@/components/header"
import Image from "next/image";

export default function ServiceIntro() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto">
        {/* Section 1*/}
        <section id="about" className="px-6 py-20 scroll-mt-16">
          <h1 className="text-4xl font-bold text-foreground mb-10">회사소개</h1>
          <div className="w-full h-px bg-gray-200 mb-12"></div>
          <div className=" text-center space-y-6 mb-13">
            <h2 className="text-2xl font-bold">
              <span className="text-[#0065F4]">감정 데이터</span>
              {" "}로 투자자의 확신을 높이고, 더 나은 선택을 돕습니다.
            </h2>
            <p className="text-[#999999] text-lg">숫자에 감정을 더한, 새로운 투자 의사결정 파트너</p>
          </div>
        </section>

        {/* Section 2*/}
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

        {/* Section 3*/}
        <section className="px-6 py-40">
          <Image
            src="/info_image1.png"
            alt="우리의 가치"
            width={100}
            height={100}
            className="object-contain mx-auto mb-8"
          />
          <div className="text-center mb-30">
            <h2 className="text-3xl font-bold text-foreground">우리의 가치</h2>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="md:col-start-1">
                <h3 className="text-[23px] font-bold  text-black mb-4">
                  1. 데이터에 기반한 <span className="text-[#0065F4]">'근거 있는 선택'</span>
                </h3>
                <p className="text-grey-700 leading-relaxed">
                  우리는 "느낌"이 아닌 <span className="font-bold text-[#98C9EA]">수치와 기록</span>으로 말합니다.<br />
                  전략의 수익률은 물론, 최대 손실, 변동성, 회복 기간까지 투명하게 <br />
                  보여주며, 투자자가 <span className="font-bold text-[#98C9EA]">스스로 판단</span>할 수 있도록 돕습니다.
                </p>
              </div>   
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="md:col-start-2 text-right">
                <h3 className="text-[23px] font-bold  text-black mb-4">
                  2. <span className="text-[#0065F4]">'지속 가능한 투자 습관'</span>
                </h3>
                <p className="text-grey-700 leading-relaxed">
                  오늘 한 번의 수익이 아니라, 10년 뒤에도 계속 투자할 수 있는<br /> 
                  <span className="font-bold text-[#98C9EA]">체력과 습관</span>을 중요하게 여깁니다.<br />
                  감정을 억누르기보다는, <span className="font-bold text-[#98C9EA]">감정의 패턴을 데이터로 이해</span>하고 <br />
                  그 안에서 나만의 원칙을 지켜가는 연습을 돕습니다.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="md:col-start-1">
                <h3 className="text-[23px] font-bold  text-black mb-4">
                  3. 누구나 이해할 수 있는 <span className="text-[#0065F4]">'쉽고 친절한 투자 경험'</span>
                </h3>
                <p className="text-grey-700 leading-relaxed">
                  복잡한 용어와 난해한 차트 대신, <span className="font-bold text-[#98C9EA]">보기 쉬운 지표와 시각화</span>로<br />
                  투자 경험의 진입 장벽을 낮춥니다.<br />
                  처음 투자하는 사람도, 이미 경험이 있는 투자자도<br />
                  자신의 <span className="font-bold text-[#98C9EA]">전략을 직접 설계하고 확인</span>할 수 있습니다.
                </p>
              </div>              
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="md:col-start-2 text-right">
                <h3 className="text-[23px] font-bold  text-black mb-4">
                  4. <span className="text-[#0065F4]">'투명성'</span>과 <span className="text-[#0065F4]">'정직함'</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  잘 나온 결과만 보여주지 않습니다.<br />
                  불리한 구간, 손실이 났던 시기, <br />전략이 견디지 못했던 시장까지 그대로 드러냅니다.<br />
                  투자에서 <span className="font-bold text-[#98C9EA]">가장 큰 리스크는 “모르는 것”</span>이라고 믿기 때문입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="px-6 py-20">
          <div className="text-center space-y-6">
            <Image
              src="/info_image2.png"
              alt="비전 및 목표"
              width={80}
              height={80}
              className="object-contain mx-auto mb-8"
            />
            <h2 className="text-3xl font-bold text-foreground">비전 및 목표</h2>

            <div className="space-y-4 text-gray-700 max-w-3xl mx-auto">
              <p className="text-lg">
                우리는 "혼자 하는 투자"를 <span className="font-bold text-[#0065F4]">"함께 검증하는 투자"</span>로
                바꾸고자 합니다.
              </p>
              <p className="text-lg">더 많은 개인 투자자가 데이터와 시뮬레이션을 통해</p>
              <p className="text-lg">자신의 전략을 검증하고,</p>
              <p className="text-lg">스스로의 투자 철학을 만들어가는 과정에 함께 하겠습니다</p>
            </div>
          </div>
        </section>

        {/* Section 5*/}
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
