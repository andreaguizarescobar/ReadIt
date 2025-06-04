import express from "express";
// Importa las funciones controladoras para manejar reportes
import { addReporte, updateReporte, getReportes } from "../controllers/reporteController.js";

// Crea un router de Express para definir rutas relacionadas con reportes
const router = express.Router();

// Ruta para crear un nuevo reporte usando el método POST
router.post("/", addReporte);

// Ruta para actualizar un reporte existente identificado por 'IdReporte' usando el método PUT
router.put("/:IdReporte", updateReporte);

// Ruta para obtener todos los reportes usando el método GET
router.get("/", getReportes);

// Exporta el router para ser usado en la aplicación principal
export default router;
