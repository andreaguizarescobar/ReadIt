import jwt from "jsonwebtoken";

// Clave secreta para firmar y verificar los tokens, tomada de las variables de entorno
const JWT_SECRET = process.env.jswt_clave;

// Tiempo de expiración del token (1 día)
const JWT_EXPIRES_IN = "1d";

// Función para generar un token JWT a partir de un payload (datos a incluir en el token)
export function generateToken(payload) {
  // Crear y devolver el token firmado con la clave secreta y con tiempo de expiración
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

// Función para verificar la validez de un token JWT recibido
export function verifyToken(token) {
  try {
    // Intentar verificar el token con la clave secreta
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    // Si ocurre un error (token inválido o expirado), devolver null
    return null;
  }
}
