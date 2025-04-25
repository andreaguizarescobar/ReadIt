import express from "express";
import * as clubController from "../controllers/clubController.js";

const router = express.Router();

router.get("/", clubController.getClubs);
router.get("/:NombreClub", clubController.getClub);
router.post("/", clubController.createClub);
router.put("/:nombreClub", clubController.updateClub);
router.delete("/:id", clubController.deleteClub);
router.patch("/:nombreClub/increment-members", clubController.incrementMembers);

export default router;
