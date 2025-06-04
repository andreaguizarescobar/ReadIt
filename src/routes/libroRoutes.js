import express from "express";
import multer from "multer";
import * as libroController from "../controllers/libroController.js";

const router = express.Router(); // Crear un router de Express para manejar rutas relacionadas a libros

// Configuración de Multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    // Crear un nombre único para el archivo usando timestamp y un número aleatorio
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }); // Inicializar Multer con la configuración de almacenamiento

router.get("/", libroController.getAllLibros); // Ruta para obtener todos los libros
router.get("/:id", libroController.getLibroById); // Ruta para obtener un libro específico por ID

// Ruta para crear un libro con archivos subidos: portadaLibro (imagen) y archivoLibro (archivo del libro)
router.post("/", upload.fields([
  { name: "portadaLibro", maxCount: 1 },
  { name: "archivoLibro", maxCount: 1 }
]), libroController.createLibro);

export default router; // Exportar el router para usarlo en la aplicación principal
