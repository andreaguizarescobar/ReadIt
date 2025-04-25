import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register/google", userController.registerUser);
router.post("/registrar", userController.register);
router.get("/verify-email", userController.verifyEmail);
router.post("/login", userController.login);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);

export default router;
