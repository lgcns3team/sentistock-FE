
export type CommunityPost = {
  id: number
  isHot: boolean
  stockName: string
  author: string
  authorAvatar?: string
  time: string
  title: string
  content: string
  likes: number
  dislikes: number
  comments: number
  views: number
}

export type CommunityComment = {
  id: number
  author: string
  authorAvatar?: string
  time: string
  content: string
  likes?: number
  dislikes?: number
}

export const POSTS: CommunityPost[] = [
    // 1~4: hot
  { id: 1, isHot: true, stockName: "삼성전자", author: "차트보는오후", authorAvatar: "/stylized-user-avatar.png", time: "2025.12.21.22:41", title: "엠비디아 픽 삼성 끝", 
    content: "21일 반도체 업계에 따르면 엔비디아는 최근 삼성전자를 방문해 HBM4 시스템 인 패키지 테스트 진행 상황을 공유했다. 이 자리에서 삼성전자의 HBM4가 구동 속도와 전력 효율 측면에서 메모리 업체 가운데 가장 우수한 성과를 냈다는 평가가 전달된 것으로 전해졌다.", 
    likes: 247, dislikes: 23, comments: 3, views: 1834 },
  { id: 2, isHot: true, stockName: "삼성전자", author: "손절은기술이다", authorAvatar: "/user-avatar-2.jpg", time: "2025.12.25.", title: "내생각 어제나온 최고의 뉴스", 
    content: "hbm 4\n자체gpu 이런건 선반영 뉴스임.\n\n가장 큰 호재는 엔비디아가 인텔18a 투자손절한거임.\n24일 장끝나고 밤늦게 나온뉴스.\n\n이건 삼성파운드리에 엄청큰 뉴스.\ntsmc는 물량이 꽉찼고.\n삼성파운드리에게 기회가 온것.", 
    likes: 15, dislikes: 4, comments: 2, views: 2847 },
  { id: 3, isHot: true, stockName: "삼성전자", author: "분봉장인", authorAvatar: "/user-avatar-3.jpg", time: "2025.12.25.18:34", title: "[단독] 삼성전자, 독자 GPU 개발 성공...AI 생태계 확장", 
    content: "정다연 기자 2025. 12. 25. 18:02\n\n\n삼성전자가 독자 개발한 그래픽처리장치(GPU)를 탑재한 애플리케이션프로세서(AP) ‘엑시노스2800’(가칭)을 2027년 출시할 계획인 것으로 확인됐다. GPU는 그래픽 처리, 인공지능(AI) 연산 등을 담당하는 칩으로 AI폰 등 기기의 성능을 좌우하는 핵심 반도체로 꼽힌다. 삼성전자는 자체 개발 GPU가 탑재된 엑시노스 AP를 AI폰을 넘어 스마트글라스, 자율주행차용 소프트웨어, 휴머노이드 로봇 등 온디바이스AI 플랫폼에 확대 적용해 제품 경쟁력을 끌어올릴 계획이다.\n\n25일 반도체업계에 따르면 삼성전자 시스템LSI사업부는 2027년 직접 개발한 아키텍처를 적용해 설계한 독자 GPU를 개발하고, 이를 AP ‘엑시노스2800’에 적용할 계획이다. 아키텍처는 GPU가 연산하는 방식, 설계는 연산 방식을 반도체에 구현하는 작업이다. 독자 아키텍처를 활용해 GPU를 설계할 수 있는 기업은 전 세계에 엔비디아, AMD, 인텔, 퀄컴 등 극소수에 불과하다.\n\n현재 시스템LSI사업부는 협력사 미국 AMD의 아키텍처를 활용해 자체 설계한 GPU를 최근 공개한 갤럭시S26용 AP ‘엑시노스2600’에 탑재하는 데까진 성공했다. AP는 전자 기기의 두뇌 역할을 하는 통합칩셋(SoC)으로 GPU와 중앙처리장치(CPU), 모뎀칩과 이를 컨트롤하는 인터페이스 등이 들어간다.\n\n정다연 기자 news@sentistock.com​",
    likes: 51, dislikes: 6, comments: 2, views: 3156 },
  { id: 4, isHot: true, stockName: "삼성전자", author: "장마감요정", authorAvatar: "/user-avatar-4.jpg", time: "오후 5:12", title: "삼성전자", 
    content: "솔직한 답변 부탁합니다.\n내일 올라간다 엄지\n내일 내려간다 엄지 아래\n",
    likes: 31, dislikes: 1, comments: 6, views: 4203 },

    // 5~10: regular
  { id: 5, isHot: false, stockName: "삼성전자", author: "배당모으는사람", authorAvatar: "/user-avatar-5.jpg", time: "2분 전", title: "오늘은 거래량이 좀 붙네요", 
    content: "장 초반 거래량이 평소보다 빠르게 늘고 있어요. 6만 원대 지지 확인하면 분할매수로 접근할 생각입니다.", 
    likes: 42, dislikes: 3, comments: 2, views: 0 },
  { id: 6, isHot: false, stockName: "삼성전자", author: "물타기금지령", authorAvatar: "/user-avatar-6.jpg", time: "4분 전", title: "연말 배당 기대감 있나요?", 
    content: "배당락 전까지는 변동성 있을 것 같은데, 장기 관점에서는 계속 모으는 게 맞다고 봅니다.", 
    likes: 31, dislikes: 1, comments: 2, views: 0 },
  { id: 7, isHot: false, stockName: "삼성전자", author: "단타의신입", authorAvatar: "/user-avatar-7.jpg", time: "7분 전",title: "질문있습니다", 
    content: "이 주식 처음 시작하는데 어떤 점을 주의해야 하나요?", 
    likes: 5, dislikes: 0, comments: 7, views: 0 },
  { id: 8, isHot: false, stockName: "삼성전자", author: "우량주수집가", authorAvatar: "/user-avatar-8.jpg", time: "12분 전",title: "공시 보니까 투자 계획 꾸준하네요", 
    content: "대규모 투자 계획은 장기적으로 긍정. 다만 단기 실적/환율 이슈는 체크해야 할 듯요.", 
    likes: 24, dislikes: 2, comments: 1, views: 0 },
  { id: 9, isHot: false, stockName: "삼성전자", author: "뉴스보다공시", authorAvatar: "/user-avatar-9.jpg", time: "30분 전",title: "장기 투자 전략 공유", 
    content: "저는 이렇게 투자하고 있습니다", 
    likes: 12, dislikes: 2, comments: 9, views: 0 },
  { id: 10, isHot: false, stockName: "삼성전자", author: "현금비중사수", authorAvatar: "/user-avatar-4.jpg", time: "1시간 전",title: "이번 주는 박스권 느낌", 
    content: "큰 뉴스 없으면 당분간 횡보할 듯. 저는 5일선/20일선 보고 천천히 모아가요.", 
    likes: 12, dislikes: 2, comments: 9, views: 0 },
]

export const COMMENTS_BY_POST_ID: Record<number, CommunityComment[]> = {
  1: [
    { id: 1, author: "분봉장인", authorAvatar: "/user-avatar-3.jpg", time: "1일 전", 
        content: "◇삼성전자 HBM 매출 3배 급증 가시권 2026년 HBM 매출 3배 급증 예상 내년 엔비디아 SOCAMM2 공급 1위 전망 가장 싼 D램 업체, 가장 큰 주가 업사이드 김동원, 강다현",
        likes: 2, dislikes: 0 },
    { id: 2, author: "장마감요정", authorAvatar: "/user-avatar-4.jpg", time: "3일 전", 
        content: "계속 상승할 여력이 무한하네요.",
        likes: 27, dislikes: 1 },
    { id: 3, author: "손절은기술이다", authorAvatar: "/user-avatar-5.jpg", time: "4일 전", 
        content: "좋아용~", 
        likes: 17, dislikes: 1 },
  ],
  2: [
    { id: 1, author: "갈매기사랑", authorAvatar: "/user-avatar-5.jpg", time: "46분 전", 
        content: "글치", 
        likes: 0, dislikes: 0 },
    { id: 2, author: "장마감요정", authorAvatar: "/user-avatar-6.jpg", time: "5시간 전", 
        content: "공감합니다", 
        likes: 0, dislikes: 0 },
  ],
  3: [
    { id: 1, author: "장투는체력", authorAvatar: "/user-avatar-3.jpg", time: "34분 전",
      content: "제2의 엔비디아가 되는건가",
      likes: 2, dislikes: 0,
    },
    { id: 2, author: "익절은예술", authorAvatar: "/user-avatar-4.jpg", time: "55분 전",
      content: "주가조작 거래 처벌 좀 해라",
      likes: 1, dislikes: 1,
    }
  ],
  4: [
    { id: 1, author: "거래량추적자", authorAvatar: "/user-avatar-3.jpg", time: "1시간 전",
      content: "내일 쉰다",
      likes: 2, dislikes: 0,
    },
    { id: 2, author: "장후반격", authorAvatar: "/user-avatar-4.jpg", time: "3시간 전",
      content: "신경쓰지말고 장투하세요",
      likes: 1, dislikes: 0,
    },
    { id: 3, author: "캔들분석가", authorAvatar: "/user-avatar-5.jpg", time: "16시간 전",
      content: "내일이 중요한게 아니라 내년 상반기 최소15만 이상간다.",
      likes: 1, dislikes: 2,
    },
    { id: 4, author: "단기급등탐지", authorAvatar: "/user-avatar-3.jpg", time: "2일 전",
      content: "1등전자 가자 화이팅",
      likes: 1, dislikes: 0,
    },
    { id: 5, author: "우상향믿음", authorAvatar: "/user-avatar-4.jpg", time: "2일 전",
      content: "부적절한 표현이 감지되어 내용이 가려졌습니다.",
    },
    { id: 6, author: "장초매수러", authorAvatar: "/user-avatar-5.jpg", time: "2일 전",
      content: "내일 내려간다 차트가",
      likes: 5, dislikes: 1,
    }
  ],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
}

// (선택) 헬퍼
export function getPostById(id: number) {
  return POSTS.find((p) => p.id === id)
}
export function getCommentsByPostId(id: number) {
  return COMMENTS_BY_POST_ID[id] ?? []
}