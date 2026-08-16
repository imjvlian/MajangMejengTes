import Team from "../models/team.model.js";
import { errorHandler } from "../utils/error.js";

export const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      teams,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      teams,
    });
  } catch (error) {
    next(error);
  }
};

export const createTeam = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed!"));
    }

    const team = new Team(req.body);

    await team.save();

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed!"));
    }

    const team = await Team.findByIdAndUpdate(
      req.params.teamId,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!team) {
      return next(errorHandler(404, "Team member not found"));
    }

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed!"));
    }

    const team = await Team.findByIdAndDelete(req.params.teamId);

    if (!team) {
      return next(errorHandler(404, "Team member not found"));
    }

    res.status(200).json({
      message: "Team member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};