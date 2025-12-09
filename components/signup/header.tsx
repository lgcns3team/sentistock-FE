import Image from 'next/image'

export default function SignupHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="object-contain">
            <Image
              src="/logo.png"
              alt="SentiStock Logo"
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* Navigation */}
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
      </div>
    </header>
  )
}
