import { verifyToken } from "../utils/jwtUtils.js";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ message: "Token inválido" });
    }
  } else {
    return res.status(401).json({ message: "No se proporcionó token" });
  }
};
