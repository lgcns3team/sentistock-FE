import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase";
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!;
export async function issueFcmToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;
  const swReg = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );
  return await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: swReg,
  });
}