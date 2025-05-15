import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.jswt_clave;
const JWT_EXPIRES_IN = "1d";
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}