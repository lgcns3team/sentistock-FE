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
          <h1 className="text-4xl font-bold text-foreground mb-10">SENTISTOCK <br /> 포트폴리오</h1>
          <div className="w-full h-px bg-gray-200 mb-12"></div>
          <Image
            src="/backtest_image1.png"
            alt="백테스트 상단 이미지"
            width={130}
            height={100}
            className="object-contain mx-auto mb-8"
          />
          <div className=" text-center space-y-6 mb-13">
            <h2 className="text-xl font-bold text-[#007EFF]">
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
            <div className="space-y-4 text-[#757282]">
              <p className="text-lg">
                감정 데이터가 시장 흐름과 어떻게 연결되는지, 백테스트로 확인했습니다
              </p>
              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="flex justify-end pt-2">
                    <a
                    href="/pdfs/backtest-report.pdf"
                    download
                    className="inline-flex items-center gap-2 text-xs text-[#757282] hover:text-foreground hover:underline underline-offset-4"
                    >
                    <img src="/pdf_icon.png" alt="" className="h-3.5 w-3.5" />
                    백테스트 결과 PDF 다운로드
                    </a>
                </div>
                <img
                    src="/images/backtest_1.png"
                    alt="백테스트 결과 그래프 1"
                    className="w-full border border-border/60 object-cover"
                />
                <img
                    src="/images/backtest_2.png"
                    alt="백테스트 결과 그래프 2"
                    className="w-full border border-border/60 object-cover"
                />
                <img
                    src="/images/backtest_3.png"
                    alt="백테스트 결과 그래프 3"
                    className="w-full border border-border/60 object-cover"
                />
                <img
                    src="/images/backtest_4.png"
                    alt="백테스트 결과 그래프 4"
                    className="w-full border border-border/60 object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-15">
            <div className="w-2 h-2 rounded-full bg-[#97C9FC] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-[#007EFF] animate-pulse delay-100" />
          </div>
        </section>
        <section className="px-6 py-5">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground">전략이 선택을 만드는 순간</h2>
            <div className="space-y-4 text-[#757282] ">
              <p className="text-lg">
                우리가 직접 수행한 모의투자 시뮬레이션을 통해 종합적으로 분석했습니다
              </p>
              <div className="space-y-4 max-w-3xl mx-auto">
                <div className="flex justify-end pt-2">
                        <a
                        href="/pdfs/simulation-report.pdf"
                        download
                        className="inline-flex items-center gap-2 text-xs text-[#757282] hover:text-foreground hover:underline underline-offset-4"
                        >
                        <img src="/pdf_icon.png" alt="" className="h-3.5 w-3.5" />
                        모의투자 시뮬레이션 결과 PDF 다운로드
                        </a>
                    </div>
                    <img
                        src="/images/simulation_1.png"
                        alt="시뮬레이션 결과 그래프 1"
                        className="w-full border border-border/60 object-cover"
                    />
                    <img
                        src="/images/simulation_2.png"
                        alt="시뮬레이션 결과 그래프 2"
                        className="w-full border border-border/60 object-cover"
                    />
                    <img
                        src="/images/simulation_3.png"
                        alt="시뮬레이션 결과 그래프 3"
                        className="w-full border border-border/60 object-cover"
                    />
                    <img
                        src="/images/simulation_4.png"
                        alt="시뮬레이션 결과 그래프 4"
                        className="w-full border border-border/60 object-cover"
                    />
                </div>
            </div>
          </div>
        </section>
        <div className=" text-center space-y-6 mb-13">
            <div className="flex flex-row items-center justify-center gap-4 mt-10">
                <div className="w-2 h-2 rounded-full bg-[#97C9FC] animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#007EFF] animate-pulse delay-100" />
                <div className="w-2 h-2 rounded-full bg-[#007EFF] animate-pulse delay-200" />
            </div>
            <h1 className="text-xl font-bold text-foreground mt-10"> 투자 시장을 읽고 감정으로 타이밍을 포착하는, 감정 기반 투자 인사이트 서비스</h1>
            <h1 className="text-xl font-bold text-foreground mb-30"> <span className="text-[#007EFF]">'센티스톡'</span> 입니다</h1>
          </div>
        </div>
      </main>
    </div>
  )
}