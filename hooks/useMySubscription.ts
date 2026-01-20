"use client"

import { useEffect, useState } from "react"
import { getMySubscription } from "@/lib/api"

function normalizeSubscription(data: any) {
  const subscribed = data?.subscribed ?? data?.subscribe ?? data?.isSubscribe ?? false
  const subscribeAt = data?.subscribeAt ?? data?.subscribedAt ?? null
  const nextBillingDate = data?.nextBillingDate ?? data?.nextPayDate ?? "-"
  return { subscribed, subscribeAt, nextBillingDate }
}

export function useMySubscription() {
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = async (showLoading = false) => {
    if (showLoading) setLoading(true)
    try {
      setError(null)
      const data = await getMySubscription()
      const { subscribed } = normalizeSubscription(data)
      setIsSubscribed(!!subscribed)
    } catch (e: any) {
      setError(e?.message ?? "구독 정보 조회 실패")
      setIsSubscribed(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh(true)
  }, [])

  return { loading, isSubscribed, error, refresh }
}
