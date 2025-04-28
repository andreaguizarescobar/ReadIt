import express from "express";
import * as userController from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

// Multer config for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "perfil/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/register/google", userController.registerUser);
router.post("/registrar", userController.register);
router.get("/verify-email", userController.verifyEmail);
router.post("/login", userController.login);

router.get("/:id", userController.getUserById);
router.put("/:id", upload.fields([
  { name: "fotoPerfil", maxCount: 1 },
  { name: "portadaUsuario", maxCount: 1 }
]), userController.updateUser);

router.post("/:userId/club/:clubId/add-miembro", userController.addClubMember);
router.post("/:userId/club/:clubId/add-admin", userController.addClubAdmin);

router.get("/:userId/club/:clubId/rol", userController.getUserClubRole);

router.delete("/:userId/club/:clubId/remove-miembro", userController.removeClubMember);

export default router;
