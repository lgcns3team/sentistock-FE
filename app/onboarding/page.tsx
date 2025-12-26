"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 예시 값 (회원가입 연결 후 수정)
  const investorScore = 27;
  const favoriteSectorIds = [1, 2, 3, 4, 5]; 

  const handleComplete = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const tokenType = localStorage.getItem("tokenType") ?? "Bearer";
      if (!accessToken) throw new Error("로그인이 필요합니다.");

      const res = await fetch("http://localhost:8080/api/users/me/onboarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${accessToken}`, //Bearer 토큰
        },
        body: JSON.stringify({ investorScore, favoriteSectorIds }),
      });

      if (!res.ok) {
        throw new Error("온보딩 저장 실패");
      }

      // 로컬 상태 업데이트 (선택)
      localStorage.setItem("onboardingRequired", "false");

      // 메인으로
      router.replace("/main-page");
    } catch (e) {
      alert(e instanceof Error ? e.message : "온보딩 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button disabled={loading} onClick={handleComplete}>
        {loading ? "저장 중..." : "온보딩 완료"}
      </button>
    </div>
  );
}