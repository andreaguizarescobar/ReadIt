import express from "express";
// Importa todas las funciones del controlador de votaciones
import * as votacionController from "../controllers/votacionController.js";

const router = express.Router();

// Ruta para crear una nueva votación
router.post("/", votacionController.createVotacion);

// Ruta para obtener una votación por su ID
router.get("/:id", votacionController.getVotacionById);

// Nueva ruta para obtener la votación actual de un club específico
router.get("/club/:clubId/current", votacionController.getCurrentVotacionByClubId);

// Nueva ruta para guardar el voto de un usuario en una votación específica
router.post("/:votacionId/vote", votacionController.saveUserVote);

// Ruta para verificar si un usuario ya ha votado en una votación específica
router.get("/:votacionId/user/:userId", votacionController.hasUserVoted);

// Exporta el router para ser usado en la aplicación principal
export default router;
