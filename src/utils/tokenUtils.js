export function isTokenExpired(token) {
  // Si no hay token, se considera expirado
  if (!token) return true;

  // Obtener la parte del payload codificada en base64 (segunda sección del token JWT)
  const payloadBase64 = token.split('.')[1];
  // Si no se puede obtener el payload, se considera expirado
  if (!payloadBase64) return true;

  try {
    // Decodificar el payload de base64 a texto JSON
    const payloadJson = atob(payloadBase64);
    // Parsear el JSON para obtener el objeto payload
    const payload = JSON.parse(payloadJson);
    // Obtener el tiempo actual en segundos
    const now = Math.floor(Date.now() / 1000);
    // Comparar el tiempo de expiración del token con el tiempo actual
    // Retorna true si el token está expirado (exp < now)
    return payload.exp < now;
  } catch (error) {
    // En caso de error al decodificar o parsear, se considera expirado
    return true;
  }
}
