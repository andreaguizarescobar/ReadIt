import express from "express";
// Importa todas las funciones del controlador de usuarios
import * as userController from "../controllers/userController.js";
// Importa multer para manejo de archivos (subida de fotos)
import multer from "multer";

const router = express.Router();

// Configuración de multer para almacenamiento de archivos
const storage = multer.diskStorage({
  // Define la carpeta destino para guardar los archivos subidos
  destination: function (req, file, cb) {
    cb(null, "perfil/");
  },
  // Define el nombre único para el archivo subido para evitar colisiones
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

// Inicializa multer con la configuración de almacenamiento
const upload = multer({
  storage: storage
});

// Ruta para registrar usuario usando Google OAuth
router.post("/register/google", userController.registerUser);

// Ruta para registrar un nuevo usuario normal
router.post("/registrar", userController.register);

// Ruta para verificar el correo electrónico de un usuario
router.get("/verify-email", userController.verifyEmail);

// Ruta para iniciar sesión
router.post("/login", userController.login);

// Ruta para solicitar recuperación de contraseña
router.post("/forgot-password", userController.forgotPassword);

// Ruta para restablecer la contraseña con token válido
router.post("/reset-password", userController.resetPassword);

// Ruta para obtener todos los usuarios
router.get("/", userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get("/:id", userController.getUserById);

// Ruta para actualizar el rol de un usuario por su ID
router.put("/rol/:id", userController.updateRol);

// Ruta para actualizar información de usuario, permitiendo subir archivos de fotoPerfil y portadaUsuario
router.put("/:id", upload.fields([
  { name: "fotoPerfil", maxCount: 1 }, 
  { name: "portadaUsuario", maxCount: 1 }
]), userController.updateUser);

// Ruta para agregar un miembro a un club específico
router.post("/:userId/club/:clubId/add-miembro", userController.addClubMember);

// Ruta para agregar un administrador a un club específico
router.post("/:userId/club/:clubId/add-admin", userController.addClubAdmin);

// Ruta para obtener el rol de un usuario dentro de un club específico
router.get("/:userId/club/:clubId/rol", userController.getUserClubRole);

// Ruta para eliminar a un miembro de un club específico
router.delete("/:userId/club/:clubId/remove-miembro", userController.removeClubMember);

// Ruta para agregar una insignia a un usuario específico
router.post("/:userId/insignia/:insigniaId/add", userController.addInsigniaToUser);

// Ruta para aplicar una sanción y eliminar un comentario
router.post("/sancion", userController.applySanctionAndDeleteComment);

// Ruta para quitar un baneo a un usuario
router.post("/quitarbaneo", userController.removeBan);

// Exporta el router para ser usado en la aplicación principal
export default router;
