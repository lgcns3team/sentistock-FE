export async function authFetch(
  url: string,
  options: RequestInit = {}
){
    // 로컬 테스트용
    const accessToken =
    typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
    }
  )

  return response
}
