import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row">
        {/* 1. 관심 섹터 맞춤 설정 */}
        <div className="flex-1 p-10">
          <div className="flex items-center gap-4 mb-6">
            <Image
             src="/checkmark.png"
             alt="checkmark"
             width={30}
             height={30}
             className="object-contain"
            /> 
            <h3 className="text-3xl font-extrabold text-slate-900">
              관심 섹터 맞춤 설정
            </h3>
          </div>
          <p className="text-lg text-slate-700 mb-4">
            나에게 필요한 정보만 빠르게 확인하는<br />
            ‘맞춤형 투자 홈' 경험을 제공합니다.
          </p>
          <Image
             src="/fav_sector.png"
             alt="sector_image"
             width={300}
             height={400}
             className="object-contain"
          /> 
        </div>

        {/* 2. 실시간 금융종목 모니터링*/}
        <div className="flex-1 p-10 md:mt-30">
          <div className="flex items-center gap-4 mb-6">
            <Image
             src="/chart.png"
             alt="chart"
             width={30}
             height={30}
             className="object-contain"
            /> 
            <h3 className="text-3xl font-extrabold text-slate-900">
              실시간 급등락 <br />종목 모니터링
            </h3>
          </div>
          <p className="text-lg text-slate-700 mb-4">
            투자 판단에 필요한 핵심 변동 정보를<br />
            빠르고 정확하게 전달합니다.
          </p>
          <Image
             src="/monitoring.png"
             alt="monitoring"
             width={300}
             height={150}
             className="object-contain"
          /> 
        </div>

        {/* 3. 시장 변동 히트맵 */}
        <div className="flex-1 p-10">
          <div className="flex items-center gap-4 mb-6">
            <Image
             src="/arrow.png"
             alt="arrow"
             width={30}
             height={30}
             className="object-contain"
            /> 
            <h3 className="text-3xl font-extrabold text-slate-900">
              시장 변동 히트맵
            </h3>
          </div>
          <p className="text-lg text-slate-700 mb-4">
            색상과 구성만으로 시장의 흐름을<br />
            직관적으로 파악할 수 있는 <br />시각화 기능입니다.
          </p>
          <Image
             src="/heatmap.png"
             alt="heatmap"
             width={300}
             height={150}
             className="object-contain"
          /> 
        </div>
      </div>
    </section>
  );
}