// Importa Express para manejar rutas y middleware
import express from "express";
// Importa todas las funciones del controlador de clubes desde clubController.js
import * as clubController from "../controllers/clubController.js";

// Crea un router de Express para definir rutas relacionadas con clubes
const router = express.Router();

// Ruta GET para buscar clubes por criterios de búsqueda (query params)
// Ejemplo: /search?name=clubname
router.get("/search", clubController.getClubsBySearch);

// Ruta GET para obtener todos los clubes
router.get("/", clubController.getClubs);

// Ruta GET para obtener un club específico por su ID
// Ejemplo: /12345
router.get("/:id", clubController.getClub);

// Ruta POST para crear un nuevo club enviando datos en el cuerpo de la solicitud
router.post("/", clubController.createClub);

// Ruta PUT para actualizar un club existente por su ID
router.put("/:id", clubController.updateClub);

// Ruta DELETE para eliminar un club por su ID
router.delete("/:id", clubController.deleteClub);

// Ruta PATCH para incrementar el número de miembros de un club específico por su ID
router.patch("/:id/increment-members", clubController.incrementMembers);

// Nueva ruta GET para obtener los clubes asociados a un usuario específico por userId
// Ejemplo: /user/67890
router.get("/user/:userId", clubController.getClubsByUser);

// Exporta el router configurado para ser usado en la aplicación principal de Express
export default router;
