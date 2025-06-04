export function isTokenExpired(token) {
  // Si no hay token, se considera que está expirado
  if (!token) return true;

  // Obtener la parte del payload (la segunda sección del token JWT)
  const payloadBase64 = token.split('.')[1];

  // Si no existe la parte del payload, se considera expirado
  if (!payloadBase64) return true;

  try {
    // Decodificar la parte payload de base64 a texto JSON
    const payloadJson = atob(payloadBase64);

    // Parsear el JSON para obtener el objeto con los datos del payload
    const payload = JSON.parse(payloadJson);

    // Obtener el tiempo actual en segundos (timestamp)
    const now = Math.floor(Date.now() / 1000);

    // Comparar la fecha de expiración del token con la fecha actual
    // Si exp es menor que now, el token está expirado (true)
    return payload.exp < now;
  } catch (error) {
    // Si ocurre un error (token mal formado o JSON inválido), se considera expirado
    return true;
  }
}
