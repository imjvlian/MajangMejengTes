import express from "express";
import {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getTeams);
router.post("/", verifyToken, createTeam);
router.put("/:teamId", verifyToken, updateTeam);
router.delete("/:teamId", verifyToken, deleteTeam);

export default router;