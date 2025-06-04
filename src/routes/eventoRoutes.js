import express from "express";
import * as eventoController from "../controllers/eventoController.js";

const router = express.Router(); // Crear un router de Express para manejar rutas relacionadas a eventos

// Ruta para obtener todos los eventos
router.get("/", eventoController.getAllEventos);

// Ruta para obtener eventos próximos filtrados por el ID de la asociación
router.get("/asociacion/:id", eventoController.getUpcomingEventosByAsociacion);

// Ruta para obtener todos los eventos próximos junto con su asociación
router.get("/asociacion/", eventoController.getAllUpcomingEventosWithAsociacion);

// Ruta para obtener un evento específico por su ID
router.get("/:id", eventoController.getEventoById);

// Ruta para crear un nuevo evento general
router.post("/", eventoController.createEvento);

// Ruta para crear un nuevo evento asociado a una asociación específica
router.post("/asociacion/", eventoController.createEventoAsociacion);

export default router; // Exportar el router para integrarlo en la aplicación principal
