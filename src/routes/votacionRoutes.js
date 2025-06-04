import express from "express";
import * as votacionController from "../controllers/votacionController.js";

const router = express.Router(); // Crear un router de Express para las rutas de votación

router.post("/", votacionController.createVotacion); 
// Ruta para crear una nueva votación

router.get("/:id", votacionController.getVotacionById); 
// Ruta para obtener una votación por su ID

// Nueva ruta para obtener la votación actual de un club específico
router.get("/club/:clubId/current", votacionController.getCurrentVotacionByClubId); 

// Nueva ruta para guardar el voto de un usuario en una votación específica
router.post("/:votacionId/vote", votacionController.saveUserVote); 

// Ruta para verificar si un usuario ya ha votado en una votación específica
router.get("/:votacionId/user/:userId", votacionController.hasUserVoted); 

export default router; // Exportar el router para integrarlo en la aplicación principal
