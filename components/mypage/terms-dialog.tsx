"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type TermsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAgree: () => void
}

export function TermsDialog({ open, onOpenChange, onAgree }: TermsDialogProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [canConfirm, setCanConfirm] = useState(false)
  const thresholdPx = 12

  const handleScrollCheck = () => {
    const el = scrollRef.current
    if (!el) return
    const reachedBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - thresholdPx
    if (reachedBottom) setCanConfirm(true)
  }

  useEffect(() => {
    if (!open) {
      setCanConfirm(false)
      return
    }

    const t = setTimeout(() => {
      const el = scrollRef.current
      if (!el) return
      const noScroll = el.scrollHeight <= el.clientHeight + thresholdPx
      if (noScroll) setCanConfirm(true)
    }, 50)

    return () => clearTimeout(t)
  }, [open])

  // 약관 본문은 여기 한 번만!
  const termsText = useMemo(
    () => `
SentiStock 이용약관

제1조(목적)
본 약관은 SentiStock(이하 “회사”)이 제공하는 주식 감성 분석 기반 정보 서비스 및 이에 부수하는 제반 서비스(이하 “서비스”)의 이용과 관련하여 회사와 이용자 간 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조(정의)
1. “이용자”란 본 약관에 동의하고 서비스를 이용하는 회원 및 비회원을 말합니다.
2. “회원”이란 회사에 개인정보를 제공하여 회원가입을 완료한 자로서 서비스를 지속적으로 이용할 수 있는 자를 말합니다.
3. “프리미엄”이란 회사가 제공하는 유료 구독 상품(월 구독 등)을 말합니다.
4. “콘텐츠”란 회사가 서비스 내 제공하는 텍스트, 데이터, 분석 결과, 그래프, 알림, UI, 기타 일체의 정보를 말합니다.
5. “즐겨찾기”란 이용자가 특정 종목을 저장하여 조회 및 알림 기능 등을 이용할 수 있도록 하는 기능을 말합니다.

제3조(약관의 효력 및 변경)
1. 본 약관은 이용자가 동의하고 회사가 정한 절차에 따라 서비스 이용을 개시함으로써 효력이 발생합니다.
2. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.
3. 약관이 변경되는 경우 회사는 변경 내용과 적용일자를 서비스 내 공지 또는 기타 방법으로 안내합니다.
4. 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.

제4조(서비스의 제공 및 변경)
1. 회사는 다음과 같은 서비스를 제공합니다.
   - 주식 관련 뉴스 수집 및 요약 정보 제공
   - 감성 분석 결과 및 추세 정보 제공(차트/지표 등)
   - 종목 즐겨찾기 기능 및 관련 알림 기능
   - 기타 회사가 정하는 서비스
2. 회사는 운영상, 기술상 필요에 따라 서비스의 내용, 제공 방식, 제공 시간을 변경할 수 있으며, 중요한 변경이 있는 경우 사전에 안내합니다.
3. 회사는 무료 서비스와 유료 서비스를 구분하여 제공할 수 있습니다.

제5조(회원가입 및 계정관리)
1. 이용자는 회사가 정한 절차에 따라 회원가입을 신청할 수 있으며, 회사는 원칙적으로 이를 승낙합니다.
2. 회사는 다음 각 호의 경우 승낙을 거절하거나 사후에 회원자격을 제한할 수 있습니다.
   - 허위 정보를 기재한 경우
   - 타인의 명의를 도용한 경우
   - 서비스 운영을 방해하거나 부정한 목적이 있는 경우
3. 회원은 계정 정보(아이디, 비밀번호 등)를 본인이 관리해야 하며, 제3자에게 양도/대여할 수 없습니다.

제6조(유료서비스 및 결제)
1. 프리미엄은 회사가 정한 요금 및 결제 방식에 따라 구매할 수 있습니다.
2. 프리미엄은 정기 결제(자동 갱신) 방식으로 제공될 수 있으며, 이용자는 결제 화면에서 이를 확인하고 동의합니다.
3. 결제 금액, 결제일, 갱신 주기, 프로모션(예: 첫 달 할인/체험가) 등은 서비스 화면 또는 결제 안내에 따릅니다.
4. 회사는 결제 오류, 결제 수단 변경, 카드 한도 등으로 결제가 실패할 경우 프리미엄 제공을 일시 중단하거나 해지 처리할 수 있습니다.

제7조(청약철회, 환불 및 해지)
1. 이용자는 관계 법령 및 회사의 환불 정책에 따라 청약철회 또는 환불을 요청할 수 있습니다.
2. 디지털 콘텐츠/서비스 특성상 이용 즉시 제공되는 경우, 관계 법령이 허용하는 범위에서 청약철회가 제한될 수 있습니다.
3. 이용자가 구독을 해지하는 경우, 특별한 정함이 없는 한 다음 결제일부터 자동 결제가 중단됩니다.
4. 환불 기준, 환불 처리 방식, 부분 환불 가능 여부 등은 서비스 내 별도 정책(공지/고객센터 안내)에 따릅니다.

제8조(투자 관련 고지 및 면책)
1. 서비스가 제공하는 감성 분석 결과, 요약, 알림, 데이터는 정보 제공 목적이며, 특정 금융상품의 매매를 권유하거나 투자 자문을 제공하는 것이 아닙니다.
2. 투자 판단의 최종 책임은 전적으로 이용자에게 있으며, 회사는 이용자의 투자 결과(이익/손실)에 대해 책임을 지지 않습니다.
3. 회사는 데이터 제공처(뉴스, 제3자 API 등)의 사정, 지연, 오류, 누락 등으로 인해 콘텐츠의 정확성/완전성을 보장하지 않습니다.

제9조(콘텐츠 및 지식재산권)
1. 서비스 및 콘텐츠에 대한 저작권 및 지식재산권은 회사 또는 정당한 권리자에게 귀속됩니다.
2. 이용자는 서비스를 통해 제공받은 콘텐츠를 개인적·비상업적 범위에서만 이용할 수 있습니다.
3. 이용자는 회사의 사전 동의 없이 콘텐츠를 복제, 배포, 전송, 판매, 2차적 저작물 작성 등으로 이용할 수 없습니다.

제10조(이용자의 의무)
이용자는 다음 행위를 해서는 안 됩니다.
1. 타인의 계정 도용, 개인정보 침해
2. 서비스의 정상 운영을 방해하는 행위(대량 트래픽 유발, 스크래핑/크롤링 남용 등)
3. 불법 프로그램 사용, 해킹, 리버스 엔지니어링 시도
4. 회사 또는 제3자의 권리를 침해하는 행위
5. 기타 관계 법령 또는 공서양속에 반하는 행위

제11조(서비스 이용제한 및 계약해지)
1. 회사는 이용자가 본 약관을 위반하거나 서비스 운영을 방해할 경우, 사전 통지 후 서비스 이용을 제한할 수 있습니다.
2. 위반 정도가 중대한 경우 회사는 사전 통지 없이 이용 제한 또는 계약 해지를 할 수 있습니다.

제12조(개인정보보호)
회사는 이용자의 개인정보를 관련 법령 및 회사의 개인정보 처리방침에 따라 처리합니다. 개인정보 처리에 관한 자세한 사항은 개인정보 처리방침에서 정합니다.

제13조(책임 제한)
1. 회사는 천재지변, 정전, 통신 장애, 외부 API 장애 등 불가항력 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
2. 회사는 이용자 간 또는 이용자와 제3자 간 발생한 분쟁에 개입하지 않으며, 이에 대한 책임을 지지 않습니다.

제14조(준거법 및 관할)
1. 본 약관은 대한민국 법령을 준거법으로 합니다.
2. 서비스 이용과 관련하여 분쟁이 발생한 경우, 회사의 본점 소재지 관할 법원을 전속적 합의 관할로 합니다.

부칙
본 약관은 2025년 11월 7일부터 시행합니다.
`.trim(),
    []
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>이용약관</DialogTitle>
          <p className="text-sm text-gray-500">
            끝까지 스크롤하면 확인 버튼이 활성화돼요.
          </p>
        </DialogHeader>

        <div
          ref={scrollRef}
          onScroll={handleScrollCheck}
          className="h-[360px] overflow-y-auto rounded-lg border bg-white p-4 text-sm leading-6"
        >
          <pre className="whitespace-pre-wrap font-sans">{termsText}</pre>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
          <Button
            disabled={!canConfirm}
            onClick={() => {
              onAgree()
              onOpenChange(false)
            }}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
