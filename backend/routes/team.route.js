import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  getTeams,
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller.js";

const router = express.Router();

// Public
router.get("/getTeams", getTeams);

// Admin
router.get("/getAllTeams", verifyToken, getAllTeams);
router.post("/create", verifyToken, createTeam);
router.put("/update/:teamId", verifyToken, updateTeam);
router.delete("/delete/:teamId", verifyToken, deleteTeam);

export default router;