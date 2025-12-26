"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, MessageCircle, PenSquare, MoreVertical } from "lucide-react"
import Header from "@/components/header"
import Link from "next/link"

// 임시 데이터
const hotPosts = [
  {
    id: 1,
    author: "차트보는오후",
    authorAvatar: "/stylized-user-avatar.png",
    time: "2025.12.21.22:41",
    title: "🔥HOT 엠비디아 픽 삼성 끝",
    content: "21일 반도체 업계에 따르면 엔비디아는 최근 삼성전자를 방문해 HBM4 시스템 인 패키지 테스트 진행 상황을 공유했다. 이 자리에서 삼성전자의 HBM4가 구동 속도와 전력 효율 측면에서 메모리...",
    likes: 247,
    dislikes: 23,
    comments: 3,
    views: 1834,
  },
  {
    id: 2,
    author: "손절은기술이다",
    authorAvatar: "/user-avatar-2.jpg",
    time: "2025.12.25.",
    title: "🔥HOT 내생각 어제나온 최고의 뉴스",
    content: "상장날 우주항공이라는 희망앓고 투자했다가 1년 넘게 막고생하다 크맵떠고 유증되는대로 다받고 거우 본전 ...",
    likes: 15,
    dislikes: 4,
    comments: 2,
    views: 2847,
  },
  {
    id: 3,
    author: "분봉장인",
    authorAvatar: "/user-avatar-3.jpg",
    time: "2025.12.25.18:34",
    title: "🔥HOT [단독] 삼성전자, 독자 GPU 개발 성공...AI 생태계 확장",
    content: "정다연 기자 2025. 12. 25. 18:02\n삼성전자가 독자 개발한 그래픽처리장치(GPU)를 탑재한 애플리케이션프로세서(AP) ‘엑시노스2800’(가칭)을 2027년 출시할 계획인 것으로...",
    likes: 51,
    dislikes: 6,
    comments: 2,
    views: 3156,
  },
  {
    id: 4,
    author: "장마감요정",
    authorAvatar: "/user-avatar-4.jpg",
    time: "오후 5:12",
    title: "🔥HOT 삼성전자",
    content: "솔직한 답변 부탁합니다. 내일 올라간다 엄지 내일 내려간다 엄지 아래\n",
    likes: 31,
    dislikes: 1,
    comments: 6,
    views: 4203,
  },
]

const regularPosts = [
  {
    id: 5,
    author: "배당모으는사람",
    authorAvatar: "/user-avatar-5.jpg",
    time: "2분 전",
    title: "오늘은 거래량이 좀 붙네요",
    content: "장 초반 거래량이 평소보다 빠르게 늘고 있어요. 6만 원대 지지 확인하면 분할매수로 접근할 생각입니다.",
    likes: 42,
    dislikes: 3,
    comments: 2,
  },
  {
    id: 6,
    author: "물타기금지령",
    authorAvatar: "/user-avatar-6.jpg",
    time: "4분 전",
    title: "연말 배당 기대감 있나요?",
    content: "배당락 전까지는 변동성 있을 것 같은데, 장기 관점에서는 계속 모으는 게 맞다고 봅니다.",
    likes: 31,
    dislikes: 1,
    comments: 2,
  },
  {
    id: 7,
    author: "단타의신입",
    authorAvatar: "/user-avatar-7.jpg",
    time: "7분 전",
    title: "질문있습니다",
    content: "이 주식 처음 시작하는데 어떤 점을 주의해야 하나요?",
    likes: 5,
    dislikes: 0,
    comments: 7,
  },
  {
    id: 8,
    author: "우량주수집가",
    authorAvatar: "/user-avatar-8.jpg",
    time: "12분 전",
    title: "공시 보니까 투자 계획 꾸준하네요",
    content: "대규모 투자 계획은 장기적으로 긍정. 다만 단기 실적/환율 이슈는 체크해야 할 듯요.",
    likes: 24,
    dislikes: 2,
    comments: 1,
  },
  {
    id: 9,
    author: "뉴스보다공시",
    authorAvatar: "/user-avatar-9.jpg",
    time: "30분 전",
    title: "장기 투자 전략 공유",
    content: "저는 이렇게 투자하고 있습니다",
    likes: 12,
    dislikes: 2,
    comments: 9,
  },
  {
    id: 10,
    author: "현금비중사수",
    authorAvatar: "/user-avatar-4.jpg",
    time: "1시간 전",
    title: "이번 주는 박스권 느낌",
    content: "큰 뉴스 없으면 당분간 횡보할 듯. 저는 5일선/20일선 보고 천천히 모아가요.",
    likes: 12,
    dislikes: 2,
    comments: 9,
  }
]

export default function CommunityPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 2, hotPosts.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 2, 0))
  }

  const visiblePosts = hotPosts.slice(currentIndex, currentIndex + 2)

  const handlePostClick = (listId: number) => {
    router.push(`/community/list/${listId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link href="/community">
          <button className="px-1 py-4 md:py-2 text-gray-400 font-medium text-[13px] transition hover:text-gray-600 hover:underline">
            ← 전체 종목 커뮤니티 보기
          </button>
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-10 mt-5 text-center">
          <span className="text-blue-600">삼성전자</span> 커뮤니티</h1>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">인기 게시글</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-8 w-8 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= hotPosts.length - 2}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visiblePosts.map((post) => (
              <Card
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:bg-red-50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 line-clamp-1">{post.title}</h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.content}</p>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="text-sm">{post.dislikes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">전체 게시글</h2>
          <div className="space-y-3">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="cursor-pointer hover:shadow-lg transition-colors hover:bg-sky-50"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 whitespace-pre-line">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span className="text-xs">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <ThumbsDown className="h-3.5 w-3.5" />
                            <span className="text-xs">{post.dislikes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span className="text-xs">{post.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => router.push("/community/list/write")}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          <PenSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
