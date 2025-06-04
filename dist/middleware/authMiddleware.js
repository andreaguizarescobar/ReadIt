// Importa la función verifyToken para verificar la validez de un JWT
import { verifyToken } from "../utils/jwtUtils.js";

// Middleware para autenticar solicitudes utilizando JWT
export const authenticateJWT = (req, res, next) => {
  // Obtiene el encabezado de autorización de la solicitud
  const authHeader = req.headers.authorization;

  // Verifica si el encabezado existe y comienza con "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extrae el token del encabezado (omitiendo la palabra "Bearer")
    const token = authHeader.split(" ")[1];

    // Verifica y decodifica el token
    const decoded = verifyToken(token);

    // Si el token es válido, agrega la información del usuario al objeto req y continúa
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      // Si el token no es válido, responde con error 401 (no autorizado)
      return res.status(401).json({
        message: "Token inválido"
      });
    }
  } else {
    // Si no se proporciona un token, responde con error 401
    return res.status(401).json({
      message: "No se proporcionó token"
    });
  }
};
