import express from "express";
import multer from "multer";
import * as libroController from "../controllers/libroController.js";
const router = express.Router();

// Multer config for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({
  storage: storage
});
router.get("/", libroController.getAllLibros);
router.get("/:id", libroController.getLibroById);
// Expecting fields: portadaLibro (cover image), archivoLibro (book file)
router.post("/", upload.fields([{
  name: "portadaLibro",
  maxCount: 1
}, {
  name: "archivoLibro",
  maxCount: 1
}]), libroController.createLibro);
export default router;