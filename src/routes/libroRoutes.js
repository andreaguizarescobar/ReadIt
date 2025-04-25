import express from "express";
import * as libroController from "../controllers/libroController.js";

const router = express.Router();

router.get("/", libroController.getAllLibros);
router.get("/:id", libroController.getLibroById);
router.post("/", libroController.createLibro);

export default router;
