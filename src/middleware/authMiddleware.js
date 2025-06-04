import { verifyToken } from "../utils/jwtUtils.js";
// Importa la función verifyToken para validar el token JWT

export const authenticateJWT = (req, res, next) => {
  // Obtiene el encabezado Authorization de la petición
  const authHeader = req.headers.authorization;

  // Verifica que el encabezado exista y comience con "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extrae el token del encabezado (separa por espacio y toma la segunda parte)
    const token = authHeader.split(" ")[1];
    // Verifica y decodifica el token usando la función verifyToken
    const decoded = verifyToken(token);

    // Si el token es válido, añade la información decodificada al objeto req.user
    if (decoded) {
      req.user = decoded;
      // Continúa con el siguiente middleware o controlador
      next();
    } else {
      // Si el token es inválido, responde con estado 401 y mensaje
      return res.status(401).json({ message: "Token inválido" });
    }
  } else {
    // Si no se proporciona token, responde con estado 401 y mensaje
    return res.status(401).json({ message: "No se proporcionó token" });
  }
};
