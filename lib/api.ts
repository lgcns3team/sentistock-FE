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
// 컨벤션: .env의 NEXT_PUBLIC_API_BASE_URL 에 /api 까지 포함한다.
// 예) NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function getAccessToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

async function request<T>(path: string, options: RequestInit = {}) {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set")

  const token = getAccessToken()
  const url = `${BASE_URL}${path}`

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  }

  // body가 있을 때만 Content-Type을 세팅 (불필요한 preflight 줄이기)
  const hasBody = options.body !== undefined && options.body !== null
  if (hasBody && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json"
  }

  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    ...options,
    cache: "no-store",
    headers,
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
// 주의: BASE_URL에 이미 /api 가 포함되어 있으므로,
// 여기서는 절대 /api를 또 붙이지 않는다.
export function getMySubscription() {
  return request<SubscriptionInfoResponseDto>("/subscriptions/me", {
    method: "GET",
  })
}

export function startSubscription() {
  return request<SubscriptionInfoResponseDto>("/subscriptions/start", {
    method: "POST",
  })
}

export function cancelSubscription() {
  return request<SubscriptionInfoResponseDto>("/subscriptions/cancel", {
    method: "POST",
  })
}

// =====================
// Favorite APIs
// =====================

// 즐겨찾기 여부 조회
export function getFavoriteStatus(companyId: string) {
  return request<FavoriteStatusResponse>(`/companies/${companyId}/favorite`, {
    method: "GET",
  })
}

// 즐겨찾기 토글(등록/해제)
export function toggleFavorite(companyId: string) {
  return request<FavoriteStatusResponse>(`/companies/${companyId}/favorite/star`, {
    method: "POST",
  })
}
