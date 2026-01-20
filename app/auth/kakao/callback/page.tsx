import { Suspense } from "react";
import KakaoCallbackClient from "./kakaoCallbackClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">카카오 로그인 처리 중...</div>}>
      <KakaoCallbackClient />
    </Suspense>
  );
}