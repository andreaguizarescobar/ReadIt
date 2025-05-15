export function isTokenExpired(token) {
  if (!token) return true;
  const payloadBase64 = token.split('.')[1];
  if (!payloadBase64) return true;
  try {
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    return true;
  }
}