import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase";
export async function issueFcmToken(): Promise<string | null> {
  try {
    if (typeof window === "undefined") {
      console.log("[FCM] SSR 환경이라 skip");
      return null;
    }
    console.log("[FCM] requestPermission 시작");
    const permission = await Notification.requestPermission();
    console.log("[FCM] permission =", permission);
    if (permission !== "granted") {
      console.warn("[FCM] 알림 권한 거부됨");
      return null;
    }
    const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    console.log("[FCM] VAPID_KEY exists? =", !!VAPID_KEY);
    if (!VAPID_KEY) {
      console.error("[FCM] NEXT_PUBLIC_FIREBASE_VAPID_KEY가 undefined임");
      return null;
    }
    const messaging = await getFirebaseMessaging();
    console.log("[FCM] messaging =", messaging);
    if (!messaging) {
      console.error("[FCM] messaging 생성 실패 (firebase init 문제)");
      return null;
    }
    console.log("[FCM] service worker register 시작");
    const swReg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("[FCM] swReg scope =", swReg.scope);
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swReg,
    });
    console.log("[FCM] token 발급 성공:", token?.slice(0, 20) + "...", "len=", token?.length);
    return token ?? null;
  } catch (e) {
    console.error("[FCM] issueFcmToken 실패:", e);
    return null;
  }
}