// Importa Express para crear rutas y middleware
import express from "express";
// Importa multer para manejar la subida de archivos
import multer from "multer";
// Importa todas las funciones del controlador de libros desde libroController.js
import * as libroController from "../controllers/libroController.js";

// Crea un router de Express para definir rutas relacionadas con libros
const router = express.Router();

// Configuración de almacenamiento para multer: define dónde y cómo se guardan los archivos subidos
const storage = multer.diskStorage({
  // Define la carpeta donde se guardarán los archivos subidos
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta "uploads" para almacenar los archivos
  },
  // Define el nombre del archivo guardado usando un sufijo único para evitar conflictos
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

// Crea una instancia de multer con la configuración de almacenamiento definida
const upload = multer({
  storage: storage
});

// Ruta GET para obtener todos los libros disponibles
router.get("/", libroController.getAllLibros);

// Ruta GET para obtener un libro específico por su ID
// Ejemplo: /12345
router.get("/:id", libroController.getLibroById);

// Ruta POST para crear un libro nuevo con archivos subidos (portada y archivo del libro)
// Se esperan los campos: portadaLibro (imagen de portada) y archivoLibro (archivo del libro)
// Ambos campos aceptan un solo archivo
router.post(
  "/",
  upload.fields([
    { name: "portadaLibro", maxCount: 1 },
    { name: "archivoLibro", maxCount: 1 }
  ]),
  libroController.createLibro
);

// Exporta el router configurado para usarlo en la aplicación principal de Express
export default router;
