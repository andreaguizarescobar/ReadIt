import express from "express";
import * as votacionController from "../controllers/votacionController.js";

const router = express.Router();

router.post("/", votacionController.createVotacion);
router.get("/:id", votacionController.getVotacionById);

export default router;
