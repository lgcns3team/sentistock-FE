import { initializeApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  onMessage,
} from "firebase/messaging";
/* =========================================
   Firebase 기본 설정
   ========================================= */
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};
/* =========================================
   Firebase App 초기화
   - 앱 전체에서 단 1회만 생성
   ========================================= */
const app = initializeApp(firebaseConfig);
/* =========================================
   Firebase Messaging 반환 함수
   - issueFcmToken()에서 사용
   - 포그라운드 푸시 처리도 여기서 등록
   ========================================= */
export async function getFirebaseMessaging() {
  // 서버 사이드 렌더링 방지
  if (typeof window === "undefined") return null;
  // 브라우저 FCM 지원 여부 확인
  const supported = await isSupported();
  if (!supported) return null;
  const messaging = getMessaging(app);
  /* =========================================
     포그라운드(Foreground) 푸시 처리
     - 사이트가 열려 있을 때
     - OS 알림(Notification)을 직접 표시
     - 앱 전체에서 1회만 등록됨
     ========================================= */
  onMessage(messaging, (payload) => {
    const title = payload.data?.title ?? "센티스톡 알림";
    const body = payload.data?.body ?? "";
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  });
  return messaging;
}







