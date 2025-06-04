import express from "express";
import { getInsignias, getInsigniasByUser } from "../controllers/insigController.js";

const router = express.Router(); // Crear un router de Express para manejar rutas relacionadas a insignias

// Ruta para obtener todas las insignias disponibles
router.get("/", getInsignias);

// Ruta para obtener las insignias específicas de un usuario mediante su ID
router.get("/user/:userId", getInsigniasByUser);

export default router; // Exportar el router para integrarlo en la aplicación principal
