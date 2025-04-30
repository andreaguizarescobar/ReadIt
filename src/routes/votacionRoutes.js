import express from "express";
import * as votacionController from "../controllers/votacionController.js";

const router = express.Router();

router.post("/", votacionController.createVotacion);
router.get("/:id", votacionController.getVotacionById);

// New route to get current votacion for a club
router.get("/club/:clubId/current", votacionController.getCurrentVotacionByClubId);

// New route to save a user's vote
router.post("/:votacionId/vote", votacionController.saveUserVote);

router.get("/:votacionId/user/:userId", votacionController.hasUserVoted);

export default router;
