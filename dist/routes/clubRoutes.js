import express from "express";
import * as clubController from "../controllers/clubController.js";
const router = express.Router();
router.get("/search", clubController.getClubsBySearch);
router.get("/", clubController.getClubs);
router.get("/:id", clubController.getClub);
router.post("/", clubController.createClub);
router.put("/:id", clubController.updateClub);
router.delete("/:id", clubController.deleteClub);
router.patch("/:id/increment-members", clubController.incrementMembers);

// New route to get clubs by user ID
router.get("/user/:userId", clubController.getClubsByUser);
export default router;