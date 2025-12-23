import Image from "next/image";
import { useState } from "react"
import Link from "next/link";
import { Menu, X } from "lucide-react"

const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "로그인 실패";
  };

export default function LoginSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
        // credentials: "include", // 쿠키 기반이면 ON, 지금은 토큰 내려주니까 보통 OFF
      });

      const data = await res.json(); 

      if (!res.ok) {
        throw new Error("아이디 또는 비밀번호를 확인해 주세요.");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("tokenType", data.tokenType); 
      localStorage.setItem("userId", data.userId);

      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("investorType", data.investorType);
      localStorage.setItem("subscribe", String(data.subscribe));
      localStorage.setItem("onboardingRequired", String(data.onboardingRequired));

      if (data.onboardingRequired) {
        window.location.href = "/onboarding";
      } else {
        window.location.href = "/main-page"; 
      }
    } catch (err: unknown) {
      setErrorMsg(getErrorMessage(err));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/main-background.png)",
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <header className="relative bg-white border-b border-gray-200 px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
                src="/logo.png"
                alt="SentiStock Logo"
                width={150}
                height={150}
                className="object-contain"
            />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            <Link href="/service-info" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              회사소개
            </Link>
            <Link href="/notice" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              공지사항
            </Link>
            <Link href="/customer-center" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              고객센터
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              자주 묻는 질문
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4 ml-6">
            {/* 모바일 햄버거 */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div
              className="absolute top-full left-0 w-full h-screen bg-black/40 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-screen bg-white shadow-lg z-50">
            <nav className="flex flex-col divide-y">
              <Link
                href="/service-info"
                className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                회사소개
              </Link>
              <Link
                href="/notice"
                className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                공지사항
              </Link>
              <Link
                href="/customer-center"
                className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                고객센터
              </Link>
              <Link
                href="/faq"
                className="px-6 py-4 text-sm font-medium hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                자주 묻는 질문
              </Link>
            </nav>
          </div>
        )}
        </header>

        <div className="flex-1 flex items-center px-12 overflow-hidden">
          <div className="flex-1" />
          <div className="w-80 lg:w-1/3 flex flex-col justify-center shrink-0">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-9">LOGIN</h2>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">ID</label>
                  <input
                    type="text"
                    className="w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-m font-medium text-gray-700 mb-2 block">PW</label>
                  <input
                    type="password"
                    className="w-80 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-[150px] h-[37px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-sm transition items-center justify-center">
                    {loading ? "로그인 중..." : "로그인"}
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
                  <Link href="/signup" className="text-blue-600 font-medium hover:underline transition">회원가입</Link>
                </div>

              </form>
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
