"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import SectorMonitor from "@/components/community/sector-monitor"

interface Post {
  id: string
  title: string
  preview: string
  views: number
}

interface Stock {
  id: string
  name: string
  currentPrice: number
  changeRate: number
  sector: Sector
  posts: Post[]
}

const mockStocks: Stock[] = [
  // 반도체 (5개)
  {
    id: "005930",
    name: "삼성전자",
    currentPrice: 71200,
    changeRate: -2.34,
    sector: "반도체",
    posts: [
      {
        id: "1",
        title: "엠비디아 픽 삼성 끝",
        preview: "21일 반도체 업계에 따르면 엔비디아는 최근 삼성전자를 방문해 HBM4 시스템 인 패키지 테스트 진행 상황을 공유했다. 이 자리에서 삼성전자의 HBM4가 구동 속도와 전력 효율 측면에서 메모리...",
        views: 1834,
      },
      {
        id: "2",
        title: "내생각 어제나온 최고의 뉴스",
        preview: "상장날 우주항공이라는 희망앓고 투자했다가 1년 넘게 막고생하다 크맵떠고 유증되는대로 다받고 거우 본전 ...",
        views: 2847,
      },
      {
        id: "3",
        title: "[단독] 삼성전자, 독자 GPU 개발 성공...AI 생태계 확장",
        preview: "삼성전자가 독자 개발한 그래픽처리장치(GPU)를 탑재한 애플리케이션프로세서(AP) ‘엑시노스2800’(가칭)을 2027년 출시할...",
        views: 4203,
      },
    ],
  },
  {
    id: "000660",
    name: "SK하이닉스",
    currentPrice: 189500,
    changeRate: 3.21,
    sector: "반도체",
    posts: [
      {
        id: "4",
        title: "AI 반도체 호황 지속",
        preview: "HBM 수요 증가로 인한 실적 개선이 계속되고 있습니다...",
        views: 18456,
      },
      {
        id: "5",
        title: "엔비디아 협력 강화",
        preview: "차세대 GPU용 메모리 공급 계약 체결로 매출 증대 기대...",
        views: 16234,
      },
      {
        id: "6",
        title: "중국 시장 회복 조짐",
        preview: "중국 스마트폰 시장 회복으로 DRAM 수요가 늘어나고...",
        views: 14123,
      },
    ],
  },
  {
    id: "000990",
    name: "DB하이텍",
    currentPrice: 52300,
    changeRate: 1.75,
    sector: "반도체",
    posts: [
      {
        id: "19",
        title: "파워 반도체 수주 증가",
        preview: "전기차 및 신재생에너지 분야 파워 반도체 수요가 급증하면서...",
        views: 9876,
      },
      {
        id: "20",
        title: "설비 투자 확대 발표",
        preview: "차세대 공정 라인 구축을 위한 대규모 투자 계획을...",
        views: 8654,
      },
      {
        id: "21",
        title: "해외 고객사 다변화",
        preview: "유럽과 북미 지역 신규 고객 확보로 매출 다각화...",
        views: 7432,
      },
    ],
  },
  {
    id: "067310",
    name: "하나마이크론",
    currentPrice: 28700,
    changeRate: 4.89,
    sector: "반도체",
    posts: [
      {
        id: "22",
        title: "반도체 테스트 시장 확대",
        preview: "AI 칩 검증 수요 증가로 테스트 사업 부문 매출이...",
        views: 6543,
      },
      {
        id: "23",
        title: "신규 패키징 기술 개발",
        preview: "고밀도 패키징 솔루션으로 경쟁력 강화에 나서며...",
        views: 5789,
      },
      {
        id: "24",
        title: "대만 업체와 협력",
        preview: "TSMC 공급망 진입을 위한 기술 협력이 본격화되면서...",
        views: 4876,
      },
    ],
  },
  {
    id: "008700",
    name: "아남반도체",
    currentPrice: 15400,
    changeRate: -1.28,
    sector: "반도체",
    posts: [
      {
        id: "25",
        title: "메모리 테스트 물량 증가",
        preview: "모바일 DRAM 검수 물량이 전분기 대비 크게 늘어나며...",
        views: 4321,
      },
      {
        id: "26",
        title: "베트남 공장 가동률 상승",
        preview: "동남아 거점 공장의 생산 효율 개선으로 수익성이...",
        views: 3987,
      },
      {
        id: "27",
        title: "자동차용 반도체 진출",
        preview: "차량용 반도체 테스트 시장 진입을 위한 준비를...",
        views: 3654,
      },
    ],
  },

  // 모빌리티 (5개)
  {
    id: "005380",
    name: "현대자동차",
    currentPrice: 243500,
    changeRate: 1.46,
    sector: "모빌리티",
    posts: [
      { id: "7", title: "전기차 판매 급증", preview: "아이오닉 시리즈의 글로벌 판매가 증가하면서...", views: 13890 },
      { id: "8", title: "미국 시장 점유율 상승", preview: "북미 지역에서의 브랜드 인지도 개선으로...", views: 12456 },
      {
        id: "9",
        title: "자율주행 기술 투자 확대",
        preview: "레벨4 자율주행 기술 개발에 대규모 투자를...",
        views: 11234,
      },
    ],
  },
  {
    id: "000270",
    name: "기아",
    currentPrice: 118900,
    changeRate: 2.15,
    sector: "모빌리티",
    posts: [
      {
        id: "28",
        title: "EV6 유럽 시장 선전",
        preview: "유럽 전기차 시장에서 EV6가 판매량 상위권을 기록하며...",
        views: 11234,
      },
      {
        id: "29",
        title: "디자인 혁신 전략",
        preview: "새로운 디자인 철학 'Opposites United'로 브랜드 가치 상승...",
        views: 10123,
      },
      {
        id: "30",
        title: "인도 시장 점유율 확대",
        preview: "인도 SUV 시장에서 빠르게 성장하며 현지 생산 확대...",
        views: 9456,
      },
    ],
  },
  {
    id: "012330",
    name: "현대모비스",
    currentPrice: 267000,
    changeRate: -0.74,
    sector: "모빌리티",
    posts: [
      {
        id: "31",
        title: "자율주행 부품 공급 확대",
        preview: "레이더와 라이다 센서 공급이 늘어나며 자율주행 부품 매출이...",
        views: 8765,
      },
      {
        id: "32",
        title: "전동화 부품 수주 증가",
        preview: "글로벌 완성차 업체들의 전동화 전환으로 수주잔고가...",
        views: 7890,
      },
      {
        id: "33",
        title: "수소연료전지 양산 체계",
        preview: "수소 전기차용 연료전지 시스템 양산 준비를 완료하며...",
        views: 7234,
      },
    ],
  },
  {
    id: "011210",
    name: "현대위아",
    currentPrice: 89400,
    changeRate: 3.56,
    sector: "모빌리티",
    posts: [
      {
        id: "34",
        title: "전기차 부품 전환 가속",
        preview: "내연기관 부품에서 전동화 부품으로의 사업 전환이...",
        views: 6543,
      },
      {
        id: "35",
        title: "로봇 사업 본격화",
        preview: "협동로봇과 서비스 로봇 사업을 신성장 동력으로...",
        views: 5876,
      },
      {
        id: "36",
        title: "미국 공장 증설",
        preview: "앨라배마 공장 증설로 북미 시장 대응력을 강화하며...",
        views: 5432,
      },
    ],
  },
  {
    id: "204320",
    name: "만도",
    currentPrice: 58700,
    changeRate: 1.91,
    sector: "모빌리티",
    posts: [
      {
        id: "37",
        title: "전자식 브레이크 시스템",
        preview: "차세대 브레이크 바이 와이어 시스템 개발 완료로...",
        views: 5123,
      },
      {
        id: "38",
        title: "ADAS 솔루션 확대",
        preview: "첨단 운전자 보조 시스템 공급처를 늘리며 매출 성장...",
        views: 4789,
      },
      {
        id: "39",
        title: "중국 합작사 실적 개선",
        preview: "중국 현지 합작법인의 수익성이 개선되면서...",
        views: 4321,
      },
    ],
  },

  // 2차전지 (5개)
  {
    id: "373220",
    name: "LG에너지솔루션",
    currentPrice: 412000,
    changeRate: 2.74,
    sector: "2차전지",
    posts: [
      { id: "10", title: "북미 배터리 공장 증설", preview: "미국 IRA 보조금 혜택을 받는 공장 건설이...", views: 19456 },
      {
        id: "11",
        title: "차세대 배터리 기술 개발",
        preview: "전고체 배터리 상용화 시기가 앞당겨질 것으로...",
        views: 17234,
      },
      {
        id: "12",
        title: "테슬라 공급 계약 연장",
        preview: "테슬라와의 장기 공급 계약 체결로 안정적인...",
        views: 15678,
      },
    ],
  },
  {
    id: "006400",
    name: "삼성SDI",
    currentPrice: 389000,
    changeRate: -1.52,
    sector: "2차전지",
    posts: [
      {
        id: "40",
        title: "각형 배터리 경쟁력",
        preview: "프리미엄 전기차에 최적화된 각형 배터리로 차별화에...",
        views: 16789,
      },
      {
        id: "41",
        title: "헝가리 공장 가동",
        preview: "유럽 시장 공략을 위한 헝가리 공장이 본격 가동되며...",
        views: 15234,
      },
      {
        id: "42",
        title: "고니켈 양극재 개발",
        preview: "에너지 밀도를 높인 차세대 양극재 기술로...",
        views: 14567,
      },
    ],
  },
  {
    id: "361610",
    name: "SK아이이테크놀로지",
    currentPrice: 87300,
    changeRate: 4.23,
    sector: "2차전지",
    posts: [
      {
        id: "43",
        title: "습식 분리막 수요 급증",
        preview: "고에너지 밀도 배터리용 분리막 수요가 늘어나며...",
        views: 8976,
      },
      {
        id: "44",
        title: "중국 공장 증설 완료",
        preview: "창저우 공장 2단계 증설로 생산 능력을 2배 확대...",
        views: 8234,
      },
      {
        id: "45",
        title: "차세대 코팅 기술",
        preview: "세라믹 코팅 분리막 기술 고도화로 안전성 향상...",
        views: 7654,
      },
    ],
  },
  {
    id: "247540",
    name: "에코프로비엠",
    currentPrice: 178000,
    changeRate: 5.67,
    sector: "2차전지",
    posts: [
      {
        id: "46",
        title: "하이니켈 양극재 공급 확대",
        preview: "NCM 9계열 양극재 양산으로 고객사 다변화에 성공하며...",
        views: 12345,
      },
      {
        id: "47",
        title: "헝가리 공장 착공",
        preview: "유럽 배터리 벨류체인 진입을 위한 현지 공장 건설이...",
        views: 11234,
      },
      {
        id: "48",
        title: "리튬인산철 시장 진입",
        preview: "중저가 전기차용 LFP 양극재 사업 추진으로...",
        views: 10567,
      },
    ],
  },
  {
    id: "003670",
    name: "포스코퓨처엠",
    currentPrice: 267000,
    changeRate: -2.19,
    sector: "2차전지",
    posts: [
      {
        id: "49",
        title: "리튬 원료 수직계열화",
        preview: "아르헨티나 리튬 광산 개발로 원료 안정성 확보에...",
        views: 9876,
      },
      {
        id: "50",
        title: "양극재 캐파 증설",
        preview: "광양 공장 증설로 양극재 생산능력을 대폭 늘리며...",
        views: 9123,
      },
      {
        id: "51",
        title: "니켈 가격 하락 수혜",
        preview: "원재료 가격 안정화로 수익성 개선이 기대되며...",
        views: 8456,
      },
    ],
  },

  // 재생에너지 (5개)
  {
    id: "005490",
    name: "POSCO홀딩스",
    currentPrice: 387000,
    changeRate: 0.78,
    sector: "재생에너지",
    posts: [
      { id: "13", title: "수소 생산 설비 확대", preview: "그린 수소 생산 능력을 2배로 늘리는 투자를...", views: 14567 },
      {
        id: "14",
        title: "해상풍력 발전 사업 진출",
        preview: "서해안 해상풍력 프로젝트에 본격 참여하며...",
        views: 13234,
      },
      {
        id: "15",
        title: "탄소중립 로드맵 발표",
        preview: "2050년까지 탄소중립을 달성하기 위한 구체적인...",
        views: 12890,
      },
    ],
  },
  {
    id: "009830",
    name: "한화솔루션",
    currentPrice: 34800,
    changeRate: 3.42,
    sector: "재생에너지",
    posts: [
      {
        id: "52",
        title: "미국 태양광 공장 완공",
        preview: "조지아주 태양광 모듈 공장이 완공되며 IRA 혜택 기대...",
        views: 13456,
      },
      {
        id: "53",
        title: "페로브스카이트 기술 개발",
        preview: "차세대 태양전지 기술 상용화로 효율성 대폭 향상...",
        views: 12345,
      },
      {
        id: "54",
        title: "수소 사업 포트폴리오 확대",
        preview: "그린 수소 생산부터 운송까지 밸류체인 구축에...",
        views: 11678,
      },
    ],
  },
  {
    id: "034020",
    name: "두산에너빌리티",
    currentPrice: 19450,
    changeRate: 2.91,
    sector: "재생에너지",
    posts: [
      {
        id: "55",
        title: "해상풍력 타워 수주",
        preview: "유럽 해상풍력 프로젝트에서 대형 타워 수주에 성공하며...",
        views: 10234,
      },
      {
        id: "56",
        title: "SMR 개발 진행",
        preview: "소형모듈원자로 개발로 청정 에너지 포트폴리오 강화...",
        views: 9567,
      },
      {
        id: "57",
        title: "수소터빈 기술 선도",
        preview: "수소 혼소 가스터빈 기술로 탄소배출 저감에...",
        views: 8901,
      },
    ],
  },
  {
    id: "018880",
    name: "한온시스템",
    currentPrice: 14300,
    changeRate: -1.38,
    sector: "재생에너지",
    posts: [
      {
        id: "58",
        title: "전기차 열관리 시스템",
        preview: "전기차 배터리 및 파워트레인 열관리 솔루션으로...",
        views: 7654,
      },
      {
        id: "59",
        title: "히트펌프 시스템 확대",
        preview: "에너지 효율적인 히트펌프 기술로 전기차 난방 최적화...",
        views: 7123,
      },
      {
        id: "60",
        title: "글로벌 수주 확대",
        preview: "유럽 완성차 업체로부터 대규모 신규 수주를...",
        views: 6789,
      },
    ],
  },
  {
    id: "112610",
    name: "씨에스윈드",
    currentPrice: 78900,
    changeRate: 6.21,
    sector: "재생에너지",
    posts: [
      {
        id: "61",
        title: "풍력타워 수주 잔고 증가",
        preview: "글로벌 해상풍력 프로젝트 증가로 수주잔고가 역대 최대...",
        views: 11234,
      },
      {
        id: "62",
        title: "베트남 공장 증설",
        preview: "동남아 시장 공략을 위한 베트남 생산기지 확장에...",
        views: 10345,
      },
      {
        id: "63",
        title: "대형화 추세 대응",
        preview: "15MW급 이상 초대형 풍력타워 생산 능력 확보로...",
        views: 9678,
      },
    ],
  },

  // 원자력에너지 (5개)
  {
    id: "015760",
    name: "한국전력",
    currentPrice: 23150,
    changeRate: -0.64,
    sector: "원자력에너지",
    posts: [
      { id: "16", title: "SMR 사업 본격화", preview: "소형모듈원전 개발 및 해외 수출 추진이...", views: 16789 },
      { id: "17", title: "전력요금 인상 논의", preview: "적자 누적으로 인한 요금 조정 필요성이...", views: 15234 },
      { id: "18", title: "원전 재가동 계획", preview: "정부의 원전 정책 전환에 따른 가동률 증가...", views: 14456 },
    ],
  },
  {
    id: "034020",
    name: "두산에너빌리티",
    currentPrice: 19450,
    changeRate: 2.91,
    sector: "원자력에너지",
    posts: [
      {
        id: "64",
        title: "체코 원전 수주 기대",
        preview: "체코 신규 원전 건설 프로젝트 우선협상대상자 선정으로...",
        views: 18234,
      },
      {
        id: "65",
        title: "SMR 기술 개발 가속",
        preview: "혁신형 소형모듈원자로 설계 인증 추진으로...",
        views: 16789,
      },
      {
        id: "66",
        title: "원전 MRO 사업 확대",
        preview: "국내외 원전 유지보수 시장에서 점유율 확대를...",
        views: 15234,
      },
    ],
  },
  {
    id: "051609",
    name: "한전KPS",
    currentPrice: 68400,
    changeRate: 1.34,
    sector: "원자력에너지",
    posts: [
      {
        id: "67",
        title: "원전 정비 물량 증가",
        preview: "원전 가동률 상승으로 정비 및 보수 수요가 늘어나며...",
        views: 9876,
      },
      {
        id: "68",
        title: "해외 원전 정비 진출",
        preview: "중동 및 동유럽 원전 정비 시장 진출로 매출 다각화...",
        views: 9234,
      },
      {
        id: "69",
        title: "디지털 트윈 기술 도입",
        preview: "AI 기반 예측 정비 시스템으로 효율성을 높이며...",
        views: 8567,
      },
    ],
  },
  {
    id: "007340",
    name: "한전원자력연료",
    currentPrice: 21800,
    changeRate: 0.92,
    sector: "원자력에너지",
    posts: [
      {
        id: "70",
        title: "원전 연료 공급 확대",
        preview: "국내 원전 가동 증가로 핵연료봉 공급량이 늘어나며...",
        views: 7654,
      },
      {
        id: "71",
        title: "사용후핵연료 처리 기술",
        preview: "파이로프로세싱 기술 개발로 방사성폐기물 감축에...",
        views: 7123,
      },
      {
        id: "72",
        title: "해외 연료 수출 추진",
        preview: "UAE 등 해외 원전 운영국으로 연료 수출 협의...",
        views: 6789,
      },
    ],
  },
]

type Sector =
  | "반도체"
  | "모빌리티"
  | "2차전지"
  | "재생에너지"
  | "원자력에너지"

const sectors: Sector[] = [
  "반도체",
  "모빌리티",
  "2차전지",
  "재생에너지",
  "원자력에너지",
]

const SECTOR_ID_MAP: Record<Sector, number> = {
  반도체: 1,
  모빌리티: 2,
  "2차전지": 3,
  재생에너지: 4,
  원자력에너지: 5,
}

export default function StockCommunityPage() {
  const [selectedSector, setSelectedSector] = useState<Sector>("반도체")

  const filteredStocks = mockStocks
    .filter((stock) => stock.sector === selectedSector)
    .sort((a, b) => a.name.localeCompare(b.name, "ko"))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sector Tabs */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 lg:max-w-7xl">
          <div className="flex justify-center gap-2 overflow-x-auto py-4">
            {sectors.map((sector) => (
              <Button
                key={sector}
                variant={selectedSector === sector ? "default" : "outline"}
                onClick={() => setSelectedSector(sector)}
                className={`shrink-0 rounded-full px-4 transition-colors
                  ${
                    selectedSector === sector
                      ? "bg-[#061F5B] text-white hover:bg-[#0A2F7A]"
                      : "text-[#061F5B] hover:bg-gray-200 hover:text-[#061F5B]"
                  }
                `}
              >
                {sector}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 px-5">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
            <SectorMonitor
            sectorId={SECTOR_ID_MAP[selectedSector]}
            type="up"
            />
            <SectorMonitor
            sectorId={SECTOR_ID_MAP[selectedSector]}
            type="down"
            />
        </div>
      </div>

      {/* Stock List */}
      <main className="mx-auto max-w-6xl px-4 py-6 lg:max-w-7xl">
        <div className="space-y-8">
          {filteredStocks.map((stock) => (
            <div key={stock.id} className="space-y-4">
              <div className="relative overflow-hidden flex justify-center">
                <div className="max-w-full">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-sm font-semibold text-muted-foreground">종목</span>
                    <span className="text-sm font-semibold text-muted-foreground">현재가</span>
                  </div>

                  <div className="flex items-start justify-between mb-4 px-1">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Link
                        href={`/stock/${stock.id}`}
                        className="text-lg font-bold hover:underline sm:text-xl"
                        style={{ color: "#061F5B" }}
                      >
                        {stock.name}
                      </Link>
                      <span className="text-xs text-muted-foreground sm:text-sm">{stock.id}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold sm:text-base">
                        {stock.currentPrice.toLocaleString()}원
                      </span>
                      <span
                        className={`text-sm font-medium sm:text-sm ${
                          stock.changeRate > 0
                            ? "text-red-600"
                            : stock.changeRate < 0
                              ? "text-blue-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {stock.changeRate > 0 ? "+" : ""}
                        {stock.changeRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-3 sm:gap-4">
                      {stock.posts.slice(0, 3).map((post) => (
                        <Link key={post.id} href={`/community/list/${post.id}`} className="group block">
                          <Card className="w-72 shrink-0 p-4 transition-shadow hover:shadow-md sm:w-80">
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="line-clamp-1 font-semibold text-card-foreground group-hover:text-primary">
                                  {post.title}
                                </h3>
                                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                              </div>
                              <p className="line-clamp-2 text-sm text-muted-foreground">{post.preview}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span>조회수</span>
                                <span className="font-medium">{post.views.toLocaleString()}</span>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}