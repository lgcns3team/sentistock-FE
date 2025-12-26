"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Flag, ThumbsUp, ThumbsDown, MoreVertical, Eye } from "lucide-react"

// 임시 게시글 데이터
const postsData: Record<string, any> = {
  "1": {
    id: 1,
    stockName: "삼성전자",
    author: "차트보는오후",
    authorAvatar: "/stylized-user-avatar.png",
    time: "2025.12.21.22:41",
    title: "엠비디아 픽 삼성 끝",
    content:
      "21일 반도체 업계에 따르면 엔비디아는 최근 삼성전자를 방문해 HBM4 시스템 인 패키지 테스트 진행 상황을 공유했다. 이 자리에서 삼성전자의 HBM4가 구동 속도와 전력 효율 측면에서 메모리 업체 가운데 가장 우수한 성과를 냈다는 평가가 전달된 것으로 전해졌다.",
    likes: 247,
    dislikes: 23,
    comments: 3,
    views: 136,
  },
  "2": {
    id: 2,
    stockName: "삼성전자",
    author: "손절은기술이다",
    authorAvatar: "/user-avatar-2.jpg",
    time: "2025.12.26.00:53",
    title: "내생각 어제나온 최고의 뉴스",
    content:
      "hbm 4\n자체gpu 이런건 선반영 뉴스임.\n\n가장 큰 호재는 엔비디아가 인텔18a 투자손절한거임.\n24일 장끝나고 밤늦게 나온뉴스.\n\n이건 삼성파운드리에 엄청큰 뉴스.\ntsmc는 물량이 꽉찼고.\n삼성파운드리에게 기회가 온것.",
    likes: 60,
    dislikes: 9,
    comments: 2,
    views: 120,
  },
  "3": {
    id: 3,
    author: "분봉장인",
    authorAvatar: "/user-avatar-3.jpg",
    time: "2025.12.24.05:12",
    title: "76억 개미다 (전반기 18만원 뚫린다)",
    content: "정다연 기자 2025. 12. 25. 18:02\n\n\n삼성전자가 독자 개발한 그래픽처리장치(GPU)를 탑재한 애플리케이션프로세서(AP) ‘엑시노스2800’(가칭)을 2027년 출시할 계획인 것으로 확인됐다. GPU는 그래픽 처리, 인공지능(AI) 연산 등을 담당하는 칩으로 AI폰 등 기기의 성능을 좌우하는 핵심 반도체로 꼽힌다. 삼성전자는 자체 개발 GPU가 탑재된 엑시노스 AP를 AI폰을 넘어 스마트글라스, 자율주행차용 소프트웨어, 휴머노이드 로봇 등 온디바이스AI 플랫폼에 확대 적용해 제품 경쟁력을 끌어올릴 계획이다.\n\n25일 반도체업계에 따르면 삼성전자 시스템LSI사업부는 2027년 직접 개발한 아키텍처를 적용해 설계한 독자 GPU를 개발하고, 이를 AP ‘엑시노스2800’에 적용할 계획이다. 아키텍처는 GPU가 연산하는 방식, 설계는 연산 방식을 반도체에 구현하는 작업이다. 독자 아키텍처를 활용해 GPU를 설계할 수 있는 기업은 전 세계에 엔비디아, AMD, 인텔, 퀄컴 등 극소수에 불과하다.\n\n현재 시스템LSI사업부는 협력사 미국 AMD의 아키텍처를 활용해 자체 설계한 GPU를 최근 공개한 갤럭시S26용 AP ‘엑시노스2600’에 탑재하는 데까진 성공했다. AP는 전자 기기의 두뇌 역할을 하는 통합칩셋(SoC)으로 GPU와 중앙처리장치(CPU), 모뎀칩과 이를 컨트롤하는 인터페이스 등이 들어간다.\n\n정다연 기자 news@sentistock.com​",
    likes: 41,
    dislikes: 15,
    comments: 3,
    views: 347,
  },
  "4": {
    id: 4,
    author: "장마감요정",
    authorAvatar: "/user-avatar-4.jpg",
    time: "2025.12.22.20:16",
    title: "삼성전자",
    content: "솔직한 답변 부탁합니다.\n내일 올라간다 엄지\n내일 내려간다 엄지 아래\n",
    likes: 364,
    dislikes: 87,
    comments: 5,
    views: 532,
  },
}

const commentsData: Record<string, any[]> = {
  "1": [
    {
      id: 1,
      author: "분봉장인",
      authorAvatar: "/user-avatar-3.jpg",
      time: "1일 전",
      content: "◇삼성전자 HBM 매출 3배 급증 가시권 2026년 HBM 매출 3배 급증 예상 내년 엔비디아 SOCAMM2 공급 1위 전망 가장 싼 D램 업체, 가장 큰 주가 업사이드 김동원, 강다현",
      likes: 2,
      dislikes: 0,
    },
    {
      id: 2,
      author: "장마감요정",
      authorAvatar: "/user-avatar-4.jpg",
      time: "3일 전",
      content: "계속 상승할 여력이 무한하네요.",
      likes: 27,
      dislikes: 1,
    },
    {
      id: 3,
      author: "손절은기술이다",
      authorAvatar: "/user-avatar-5.jpg",
      time: "4일 전",
      content: "좋아용~",
      likes: 17,
      dislikes: 1,
    }
  ],
  "2": [
    {
      id: 1,
      author: "갈매기사랑",
      authorAvatar: "/user-avatar-5.jpg",
      time: "46분 전",
      content: "글치",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      author: "장마감요정",
      authorAvatar: "/user-avatar-6.jpg",
      time: "5시간 전",
      content: "공감합니다",
      likes: 0,
      dislikes: 0,
    }
  ],
  "3": [
    {
      id: 1,
      author: "장투는체력",
      authorAvatar: "/user-avatar-3.jpg",
      time: "34분 전",
      content: "제2의 엔비디아가 되는건가",
      likes: 2,
      dislikes: 0,
    },
    {
      id: 2,
      author: "익절은예술",
      authorAvatar: "/user-avatar-4.jpg",
      time: "55분 전",
      content: "주가조작 거래 처벌 좀 해라",
      likes: 1,
      dislikes: 1,
    }
  ],
  "4": [
    {
      id: 1,
      author: "거래량추적자",
      authorAvatar: "/user-avatar-3.jpg",
      time: "1시간 전",
      content: "내일 쉰다",
      likes: 2,
      dislikes: 0,
    },
    {
      id: 2,
      author: "장후반격",
      authorAvatar: "/user-avatar-4.jpg",
      time: "3시간 전",
      content: "신경쓰지말고 장투하세요",
      likes: 1,
      dislikes: 0,
    },
    {
      id: 3,
      author: "캔들분석가",
      authorAvatar: "/user-avatar-5.jpg",
      time: "16시간 전",
      content: "내일이 중요한게 아니라 내년 상반기 최소15만 이상간다.",
      likes: 1,
      dislikes: 2,
    },
    {
      id: 4,
      author: "단기급등탐지",
      authorAvatar: "/user-avatar-3.jpg",
      time: "2일 전",
      content: "1등전자 가자 화이팅",
      likes: 1,
      dislikes: 0,
    },
    {
      id: 5,
      author: "우상향믿음",
      authorAvatar: "/user-avatar-4.jpg",
      time: "2일 전",
      content: "부적절한 표현이 감지되어 내용이 가려졌습니다.",
    },
    {
      id: 6,
      author: "장초매수러",
      authorAvatar: "/user-avatar-5.jpg",
      time: "2일 전",
      content: "내일 내려간다 차트가",
      likes: 5,
      dislikes: 1,
    }
  ],
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = useParams<{ id: string }>() 
  const [commentText, setCommentText] = useState("")
  const [post] = useState(postsData[id] || postsData["1"])
  const [comments] = useState(commentsData[id] || [])
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false)
  const [isReportDoneOpen, setIsReportDoneOpen] = useState(false)

  const openReportConfirm = () => setIsReportConfirmOpen(true)
  const cancelReport = () => setIsReportConfirmOpen(false)

  const confirmReport = () => {
    setIsReportConfirmOpen(false)
    setIsReportDoneOpen(true)
  }

  const closeReportDone = () => setIsReportDoneOpen(false)

  const handleBack = () => {
    router.push("/community/list")
  }

  const handleLike = () => {
    setLiked(!liked)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 max-w-3xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack} className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">{post.stockName}</h1>
          </div>
        </div>

        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-foreground">{post.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.time}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-muted-foreground hover:bg-transparent hover:text-red-600"
                onClick={openReportConfirm}
                >
                <Flag className="h-4 w-4" />
                <span className="text-xs">신고하기</span>
              </Button>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-4">{post.title}</h2>
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line mb-6">{post.content}</div>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button variant={liked ? "default" : "outline"} size="sm" onClick={handleLike} className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </Button>
              <Button variant={disliked ? "default" : "outline"} size="sm" onClick={handleDislike} className="gap-2">
                <ThumbsDown className="h-4 w-4" />
                <span>{post.dislikes + (disliked ? 1 : 0)}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-2">
            <Textarea
              placeholder="댓글을 입력하세요"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-3 min-h-[50px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
            />
            <div className="flex justify-end">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                댓글 작성
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 mb-6">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.time}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground hover:bg-transparent hover:text-red-600"
                    onClick={openReportConfirm}
                  >
                    <Flag className="h-4 w-4" />
                    <span className="text-xs">신고하기</span>
                  </Button>
                </div>
                <p className="text-sm text-foreground ml-12 mb-2">{comment.content}</p>
                <div className="flex items-center gap-3 ml-12 text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <ThumbsDown className="h-3.5 w-3.5" />
                    <span className="text-xs">{comment.dislikes}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <a
          href="https://www.fss.or.kr/fss/main/sub1Unfair.do?menuNo=200080"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-sm font-medium border-2 border-destructive text-destructive hover:text-destructive-foreground bg-transparent text-center rounded-md"
        >
          불법 주식리딩방 금융감독원 신고 국번없이 1332
        </a>
        {isReportConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-foreground">신고하시겠습니까?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              신고가 접수되면 운영 정책에 따라 검토됩니다.
            </p>

            <div className="mt-5 flex justify-center gap-2">
              <Button variant="outline" onClick={cancelReport}>취소</Button>
              <Button onClick={confirmReport} className="bg-blue-500 hover:bg-blue-600 text-white">
                확인
              </Button>
            </div>
          </div>
        </div>
      )}

      {isReportDoneOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-m font-semibold text-foreground">신고가 접수됐습니다</h2>

            <div className="mt-5 flex justify-end">
              <Button onClick={closeReportDone} className="bg-blue-500 hover:bg-blue-600 text-white">
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
