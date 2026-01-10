import { Button } from "@/components/ui/button"
import  Header from "@/components/header"
import Image from "next/image";

export default function ServiceIntro() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="max-w-6xl mx-auto">
        <section id="about" className="px-6 py-20 scroll-mt-16">
          <h1 className="text-4xl font-bold text-foreground mb-10">SENTISTOCK 포트폴리오</h1>
          <div className="w-full h-px bg-gray-200 mb-12"></div>
          <Image
            src="/backtest_image1.png"
            alt="백테스트 상단 이미지"
            width={130}
            height={100}
            className="object-contain mx-auto mb-8"
          />
          <div className=" text-center space-y-6 mb-13">
            <h2 className="text-2xl font-bold text-[#007EFF]">
              감정 데이터, 시장 흐름과 얼마나 연결되어 있을까?
            </h2>
            <div className="flex flex-col items-center gap-4 mt-10">
                <div className="w-4 h-4 rounded-full bg-[#97C9FC] animate-pulse" />
                <div className="w-4 h-4 rounded-full bg-[#007EFF] animate-pulse delay-100" />
            </div>
          </div>
        </section>
        <section className="px-6 py-5">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground">감정 시그널은 실제로 유효했을까?</h2>
            <div className="space-y-4 text-[#757282] max-w-3xl mx-auto">
              <p className="text-lg">
                감정 데이터가 시장 흐름과 어떻게 연결되는지, 백테스트로 확인했습니다
              </p>
            </div>
          </div>
        </section>
        <section className="px-6 py-5">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground">전략이 선택을 만드는 순간들</h2>
            <div className="space-y-4 text-[#757282] max-w-3xl mx-auto">
              <p className="text-lg">
                우리가 직접 수행한 모의투자 시뮬레이션을 통해 종합적으로 분석했습니다
              </p>
            </div>
          </div>
        </section>
        </div>
      </main>
    </div>
  )
}