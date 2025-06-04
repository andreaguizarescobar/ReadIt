import express from "express";
import * as userController from "../controllers/userController.js";
import multer from "multer";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router(); // Crear un router de Express para rutas relacionadas con usuarios

// Configuración de multer para almacenamiento de archivos (imágenes de perfil y portada)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "perfil/"); // Carpeta donde se guardan los archivos subidos
  },
  filename: function (req, file, cb) {
    // Generar nombre único para evitar conflictos
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }); // Instancia multer con la configuración definida

router.post("/register/google", userController.registerUser); 
// Ruta para registrar usuarios mediante Google (OAuth)

router.post("/registrar", userController.register); 
// Ruta para registrar usuarios normalmente

router.get("/verify-email", userController.verifyEmail); 
// Ruta para verificar el email del usuario mediante token

router.post("/login", userController.login); 
// Ruta para iniciar sesión

router.post("/forgot-password", userController.forgotPassword); 
// Ruta para solicitar recuperación de contraseña

router.post("/reset-password", userController.resetPassword); 
// Ruta para restablecer contraseña usando token

router.get("/", authenticateJWT, userController.getAllUsers); 
// Ruta para obtener todos los usuarios, requiere autenticación JWT

router.get("/:id", userController.getUserById); 
// Ruta para obtener un usuario por su ID (no requiere autenticación explícita aquí)

router.put("/rol/:id", authenticateJWT, userController.updateRol); 
// Ruta para actualizar el rol de un usuario, requiere autenticación

router.put("/:id", upload.fields([
  { name: "fotoPerfil", maxCount: 1 }, // Campo para subir foto de perfil
  { name: "portadaUsuario", maxCount: 1 } // Campo para subir portada del usuario
]), userController.updateUser); 
// Ruta para actualizar datos del usuario, incluyendo imágenes

router.post("/:userId/club/:clubId/add-miembro", userController.addClubMember); 
// Añadir un usuario como miembro a un club

router.post("/:userId/club/:clubId/add-admin", userController.addClubAdmin); 
// Añadir un usuario como administrador de un club

router.get("/:userId/club/:clubId/rol", userController.getUserClubRole); 
// Obtener el rol que tiene un usuario en un club específico

router.delete("/:userId/club/:clubId/remove-miembro", userController.removeClubMember); 
// Eliminar a un usuario como miembro de un club

router.post("/:userId/insignia/:insigniaId/add", userController.addInsigniaToUser); 
// Asignar una insignia a un usuario

router.post("/sancion", authenticateJWT, userController.applySanctionAndDeleteComment); 
// Aplicar sanción a un usuario y eliminar comentario, requiere autenticación

router.post("/quitarbaneo", authenticateJWT, userController.removeBan); 
// Quitar baneo a un usuario, requiere autenticación

router.get("/check-ban/:id", authenticateJWT, userController.checkBan); 
// Verificar si un usuario está baneado, requiere autenticación

export default router; // Exportar el router para usarlo en la aplicación principal
