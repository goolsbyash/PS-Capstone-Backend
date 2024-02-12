import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: undefined,
  },
  reps: {
    type: Number,
    required: true,
    default: 1,
  },
  sets: {
    type: Number,
    required: true,
    default: 1,
  },
});

const exercisePlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: undefined,
  },
  exercises: {
    type: [exerciseSchema],
    required: true,
    default: undefined,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  // Use user's _id to associate with specific account
  owner: {
    type: Number,
    required: true,
    default: 0
  }
});

export default mongoose.model("ExercisePlan", exercisePlanSchema);
