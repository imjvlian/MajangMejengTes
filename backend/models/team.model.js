import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "Team",
    },

    image: {
      type: String,
      default: "",
    },

    shortBio: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    expertise: {
      type: [String],
      default: [],
    },

    instagram: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;