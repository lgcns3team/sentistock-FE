import Image from "next/image";

export default function LoginSection() {
  return (
    <div className="w-full h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/main-background.png)",
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
                src="/logo.png"
                alt="SentiStock Logo"
                width={150}
                height={150}
                className="object-contain"
            />
            </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-600 transition">
              회사소개
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              공지사항
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              고객센터
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              자주 묻는 질문
            </a>
          </nav>
        </header>

        <div className="flex-1 flex items-center justify-end overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">LOGIN</h2>

              <div className="space-y-2">
                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">ID</label>
                  <input
                    type="text"
                    className="w-463px px-4 py-3 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    placeholder="Id input"
                  />
                </div>

                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">PW</label>
                  <input
                    type="password"
                    className="w-463px px-4 py-3 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    placeholder="PW input"
                  />
                </div>

                <div className="flex gap-4 text-sm text-gray-600 pt-4">
                  <span>회원이 아니신가요?</span>
                  <button className="text-blue-600 font-medium hover:underline transition">회원가입</button>
                </div>

                <button className="w-500px px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition mt-8">
                  로그인
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pb-8">
          <div className="flex flex-col items-center gap-1 animate-bounce">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
