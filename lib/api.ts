// lib/api.ts

// =====================
// Types
// =====================
export type SubscriptionInfoResponseDto = {
  // 백엔드가 어떤 키로 내려주든 대응하려고 optional로 둠
  subscribe?: boolean
  isSubscribe?: boolean
  subscribeAt?: string | null
  subscribedAt?: string | null
}

export type FavoriteStatusResponse = {
  favorite: boolean
}

// =====================
// Base Request Helper
// =====================
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function getAccessToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

async function request<T>(path: string, options: RequestInit = {}) {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set")

  const token = getAccessToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`${res.status} ${res.statusText} - ${text}`)
  }

  const contentType = res.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    return {} as T
  }

  return (await res.json()) as T
}

// =====================
// Subscription APIs
// =====================
export function getMySubscription() {
  return request<SubscriptionInfoResponseDto>("/api/subscriptions/me", {
    method: "GET",
  })
}

export function startSubscription() {
  return request<SubscriptionInfoResponseDto>("/api/subscriptions/start", {
    method: "POST",
  })
}

export function cancelSubscription() {
  return request<SubscriptionInfoResponseDto>("/api/subscriptions/cancel", {
    method: "POST",
  })
}

// =====================
// Favorite APIs
// =====================

// 즐겨찾기 여부 조회
export function getFavoriteStatus(companyId: string) {
  return request<FavoriteStatusResponse>(`/api/companies/${companyId}/favorite`, {
    method: "GET",
  })
}

// 즐겨찾기 토글(등록/해제)
export function toggleFavorite(companyId: string) {
  return request<FavoriteStatusResponse>(`/api/companies/${companyId}/favorite/star`, {
    method: "POST",
  })
}
