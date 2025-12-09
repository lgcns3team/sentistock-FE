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
            <a href="/customer-center" className="hover:text-blue-600 transition">
              고객센터
            </a>
            <a href="/faq" className="hover:text-blue-600 transition">
              자주 묻는 질문
            </a>
          </nav>
        </header>

        <div className="flex-1 flex items-center px-12 overflow-hidden">
          <div className="flex-1" />
          <div className="w-80 lg:w-1/3 flex flex-col justify-center shrink-0">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-9">LOGIN</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">ID</label>
                  <input
                    type="text"
                    className="w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">PW</label>
                  <input
                    type="password"
                    className="w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    placeholder=""
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button className="w-[150px] h-[37px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-sm transition items-center justify-center">
                    로그인
                  </button>

                  <button className="py-1 transition">
                    <Image
                      src="/kakao_login_medium_narrow.png"
                      alt="kakao login"
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </button>
                </div>

                <div className="flex gap-4 text-sm text-gray-600">
                  <span>회원이 아니신가요?</span>
                  <button className="text-blue-600 font-medium hover:underline transition">회원가입</button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <div className="flex flex-col items-center gap-1 animate-bounce">
          </div>
        </div>
      </div>
    </div>
  )
}
