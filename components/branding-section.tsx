import Image from "next/image";

export default function BrandingSection() {
  return (
    <div className="w-full h-full bg-linear-to-b from-white to-sky-100 px-30 py-20 flex flex-col">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-7xl font-extrabold text-gray-900 mb-5 text-right">
          종목을 입체적으로 해석
        </h2>
        <p className="text-xl sm:text-2xl font-medium text-gray-600 mb-3 text-right">
          차트, 뉴스, 감정 데이터를 <br />유기적으로 연결해<br />
          종목의 현재 흐름과 시장의 시그널을 한눈에 파악할 수 있는<br />
          분석 중심 화면입니다.
        </p>
        
      </div>
      
      <div className="mt-auto w-full flex">
        <Image
          src="/detail_image.png" 
          alt="상세 페이지 이미지"
          width={600}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  )
}

