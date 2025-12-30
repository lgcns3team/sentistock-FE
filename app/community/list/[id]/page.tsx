import Header from "@/components/header"
import PostDetailClient from "./post-detail-client"

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
    views: 1834,
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
    likes: 15,
    dislikes: 4,
    comments: 2,
    views: 2847,
  },
  "3": {
    id: 3,
    author: "분봉장인",
    authorAvatar: "/user-avatar-3.jpg",
    time: "2025.12.24.05:12",
    title: "[단독] 삼성전자, 독자 GPU 개발 성공...AI 생태계 확장",
    content: "정다연 기자 2025. 12. 25. 18:02\n\n\n삼성전자가 독자 개발한 그래픽처리장치(GPU)를 탑재한 애플리케이션프로세서(AP) ‘엑시노스2800’(가칭)을 2027년 출시할 계획인 것으로 확인됐다. GPU는 그래픽 처리, 인공지능(AI) 연산 등을 담당하는 칩으로 AI폰 등 기기의 성능을 좌우하는 핵심 반도체로 꼽힌다. 삼성전자는 자체 개발 GPU가 탑재된 엑시노스 AP를 AI폰을 넘어 스마트글라스, 자율주행차용 소프트웨어, 휴머노이드 로봇 등 온디바이스AI 플랫폼에 확대 적용해 제품 경쟁력을 끌어올릴 계획이다.\n\n25일 반도체업계에 따르면 삼성전자 시스템LSI사업부는 2027년 직접 개발한 아키텍처를 적용해 설계한 독자 GPU를 개발하고, 이를 AP ‘엑시노스2800’에 적용할 계획이다. 아키텍처는 GPU가 연산하는 방식, 설계는 연산 방식을 반도체에 구현하는 작업이다. 독자 아키텍처를 활용해 GPU를 설계할 수 있는 기업은 전 세계에 엔비디아, AMD, 인텔, 퀄컴 등 극소수에 불과하다.\n\n현재 시스템LSI사업부는 협력사 미국 AMD의 아키텍처를 활용해 자체 설계한 GPU를 최근 공개한 갤럭시S26용 AP ‘엑시노스2600’에 탑재하는 데까진 성공했다. AP는 전자 기기의 두뇌 역할을 하는 통합칩셋(SoC)으로 GPU와 중앙처리장치(CPU), 모뎀칩과 이를 컨트롤하는 인터페이스 등이 들어간다.\n\n정다연 기자 news@sentistock.com​",
    likes: 51,
    dislikes: 6,
    comments: 2,
    views: 3156,
  },
  "4": {
    id: 4,
    author: "장마감요정",
    authorAvatar: "/user-avatar-4.jpg",
    time: "2025.12.22.20:16",
    title: "삼성전자",
    content: "솔직한 답변 부탁합니다.\n내일 올라간다 엄지\n내일 내려간다 엄지 아래\n",
    likes: 31,
    dislikes: 1,
    comments: 6,
    views: 4203,
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

// ✅ S3 정적 export에서 동적 라우트 필수
export function generateStaticParams() {
  return Object.keys(postsData).map((id) => ({ id })) // "1","2","3","4"
}

// ✅ 위에 정의된 id 외에는 접근 불가 (정적 페이지 고정)
export const dynamicParams = false

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // ✅ Next 15: params는 Promise → await 필수
  const { id } = await params

  const post = postsData[id]
  const comments = commentsData[id] ?? []

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-3xl">
          <p className="text-center text-muted-foreground">해당 게시글을 찾을 수 없습니다.</p>
        </main>
      </div>
    )
  }

  return <PostDetailClient id={id} post={post} comments={comments} />
}