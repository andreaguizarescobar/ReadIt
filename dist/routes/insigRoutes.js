// Importa Express para manejar rutas y middleware
import express from "express";
// Importa las funciones getInsignias y getInsigniasByUser desde insigController.js
import { getInsignias, getInsigniasByUser } from "../controllers/insigController.js";

// Crea un router de Express para definir rutas relacionadas con insignias
const router = express.Router();

// Ruta GET para obtener todas las insignias disponibles
router.get("/", getInsignias);

// Ruta GET para obtener todas las insignias asociadas a un usuario específico por su userId
// Ejemplo: /user/12345
router.get("/user/:userId", getInsigniasByUser);

// Exporta el router configurado para ser usado en la aplicación principal de Express
export default router;
