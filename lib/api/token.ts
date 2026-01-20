import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  exp: number
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}

export function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}