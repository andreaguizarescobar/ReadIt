// Importa Express para manejar rutas y middleware
import express from "express";
// Importa todas las funciones del controlador de eventos desde eventoController.js
import * as eventoController from "../controllers/eventoController.js";

// Crea un router de Express para definir rutas relacionadas con eventos
const router = express.Router();

// Ruta GET para obtener todos los eventos disponibles
router.get("/", eventoController.getAllEventos);

// Ruta GET para obtener los próximos eventos de una asociación específica identificada por ID
// Ejemplo: /asociacion/12345
router.get("/asociacion/:id", eventoController.getUpcomingEventosByAsociacion);

// Ruta GET para obtener todos los próximos eventos junto con su información de asociación
router.get("/asociacion/", eventoController.getAllUpcomingEventosWithAsociacion);

// Ruta GET para obtener un evento específico por su ID
// Ejemplo: /67890
router.get("/:id", eventoController.getEventoById);

// Ruta POST para crear un nuevo evento con datos enviados en el cuerpo de la solicitud
router.post("/", eventoController.createEvento);

// Ruta POST para crear un nuevo evento específico para una asociación, con datos en el cuerpo de la solicitud
router.post("/asociacion/", eventoController.createEventoAsociacion);

// Exporta el router configurado para usarlo en la aplicación principal de Express
export default router;
