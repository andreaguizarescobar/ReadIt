import express from "express";
import { getInsignias } from "../controllers/insigController.js";

const router = express.Router();

router.get("/", getInsignias);

export default router;
