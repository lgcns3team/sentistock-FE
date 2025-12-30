export async function saveFcmToken(fcmToken: string, accessToken: string) {
  await fetch("http://localhost:8080/api/users/me/fcm-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ fcmToken }),
  });
}