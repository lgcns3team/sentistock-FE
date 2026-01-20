import Image from "next/image";

export default function InvestmentStyleSection() {
  return (
    <div className="w-full h-screen bg-linear-to-b from-white via-sky-100 to-white px-20 py-15 flex flex-col">

      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-7xl font-extrabold text-gray-900 mb-5 text-left">
          나는 어떤 투자 스타일일까?
        </h2>
        <p className="text-xl sm:text-2xl font-medium text-gray-600 mb-3 text-left">
          몇 가지 질문만으로
        </p>
        <p className="text-xl sm:text-2xl font-medium text-gray-600 text-left">
          나의 투자 성향을 쉽게 파악할 수 있어요.
        </p>
      </div>

      <div className="mt-auto w-full flex  md:justify-end">
        <Image
          src="/personal_type.png" 
          alt="투자 스타일 설명 이미지"
          width={600}
          height={300}
          className="object-contain"
        />
      </div>
    </div>
  );
}