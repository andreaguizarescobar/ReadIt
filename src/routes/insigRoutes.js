import express from "express";
import { getInsignias, getInsigniasByUser } from "../controllers/insigController.js";

const router = express.Router();

router.get("/", getInsignias);
router.get("/user/:userId", getInsigniasByUser);

export default router;
