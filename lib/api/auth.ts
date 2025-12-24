export interface SignupRequest {
  nickname: string
  userId: string
  password: string
  passwordConfirm: string
  userEmail: string
  investorScore: number
  favoriteSectorIds: number[]
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

export async function signup(request: SignupRequest) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    let message = "회원가입 실패"
    try {
      const error = await res.json()
      message = error.message ?? message
    } catch {}
    throw new Error(message)
  }

  try {
    return await res.json()
  } catch {
    return null
  }
}