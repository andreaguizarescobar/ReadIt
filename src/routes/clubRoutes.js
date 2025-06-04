import express from "express";
import * as clubController from "../controllers/clubController.js";

const router = express.Router(); // Crear un router de Express para manejar rutas relacionadas a clubes

// Ruta para buscar clubes con filtros o parámetros de búsqueda
router.get("/search", clubController.getClubsBySearch);

// Ruta para obtener todos los clubes
router.get("/", clubController.getClubs);

// Ruta para obtener un club específico por su ID
router.get("/:id", clubController.getClub);

// Ruta para crear un nuevo club
router.post("/", clubController.createClub);

// Ruta para actualizar un club existente por su ID
router.put("/:id", clubController.updateClub);

// Ruta para eliminar un club por su ID
router.delete("/:id", clubController.deleteClub);

// Ruta para incrementar el número de miembros de un club específico
router.patch("/:id/increment-members", clubController.incrementMembers);

// Nueva ruta para obtener clubes asociados a un usuario específico mediante su userId
router.get("/user/:userId", clubController.getClubsByUser);

export default router; // Exportar el router para usarlo en la aplicación principal
