export const stockIndex: Record<string, string> = {
  "삼성전자": "005930",
  "005930": "005930",
  "sk하이닉스": "000660",
  "000660": "000660",
  "카카오": "035720",
  "035720": "035720",
}

export const stocksData: Record<string, any> = {
  "005930": {
    name: "삼성전자",
    code: "005930",
    price: 106900,
    change: 1.71,
    sentiment: {
      score: 72,
      positive: 65,
      neutral: 25,
      negative: 10,
    },
    articles: [
      {
        id: 1,
        title: "삼성전자 실적",
        url: "https://example.com/article1",
        score: 87,
      },
      {
        id: 2,
        title: "코스피 시장 분석",
        url: "https://example.com/article2",
        score: 56,
      },
    ],
    valueChain: [
      {
        id: 1,
        name: "한미반도체",
        price: "118,200",
        change: "+18%",
        isUp: true,
        relation: "공급 업체",
      },
    ],
  },

  "000660": {
    name: "SK하이닉스",
    code: "000660",
    price: 165500,
    change: -2.15,
    sentiment: {
      score: 58,
      positive: 45,
      neutral: 35,
      negative: 20,
    },
    articles: [
      {
        id: 1,
        title: "SK하이닉스 신제품 출시",
        url: "https://example.com/article4",
        score: 72,
      },
      {
        id: 2,
        title: "반도체 산업 전망",
        url: "https://example.com/article5",
        score: 45,
      },
      {
        id: 3,
        title: "메모리 반도체 가격 상승",
        url: "https://example.com/article6",
        score: 68,
      },
    ],
    valueChain: [
      {
        id: 1,
        name: "삼성전자",
        code: "005930",
        price: "106,900",
        change: "+1.71%",
        isUp: true,
        relation: "경쟁사",
      },
      {
        id: 2,
        name: "마이크론테크놀로지",
        price: "98,500",
        change: "-1.2%",
        isUp: false,
        relation: "협력사",
      },
    ],
  },
  "035720": {
    name: "카카오",
    code: "035720",
    price: 56000,
    change: -0.85,
    sentiment: {
      score: 65,
      positive: 40,
      neutral: 35,
      negative: 25,
    },
    articles: [
      {
        id: 1,
        title: "카카오, 플랫폼 사업 구조 개편",
        url: "https://example.com/kakao-1",
        score: 73,
      },
      {
        id: 2,
        title: "카카오 주가 변동 원인 분석",
        url: "https://example.com/kakao-2",
        score: 62,
      },
    ],
    valueChain: [
      {
        id: 1,
        name: "카카오뱅크",
        price: "27,500",
        change: "+2.1%",
        isUp: true,
        relation: "계열사",
      },
      {
        id: 2,
        name: "카카오페이",
        price: "52,300",
        change: "-1.3%",
        isUp: false,
        relation: "결제 파트너",
      },
    ],
  },
}
