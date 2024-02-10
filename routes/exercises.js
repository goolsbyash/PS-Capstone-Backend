import { Router } from "express";
import ExercisePlan from "../models/exercisePlan.js";

const router = new Router();

// GET All Plans
router.get("/", async (req, res) => {
  const plans = await ExercisePlan.find({});
  res.status(200).json(plans);
});

// GET active plan
router.get("/:id", async (req, res) => {
  let activePlan = await ExercisePlan.find({ active: true });
  res.status(200).json(activePlan);
});

// Create plan

// Update name of specific plan
router.post("/:id", async (req, res) => {
  let planId = req.params.id;
  try {
    let changePlan = await ExercisePlan.findOne({ _id: planId });
    changePlan.name = req.body.name;
    await changePlan.save();
  } catch (error) {
    console.log(error);
  }
});

// Delete specific
router.delete("/:id/delete", async (req, res) => {
  let planId = req.params.id;
  try {
    let deletePlan = await ExercisePlan.deleteOne({ _id: planId });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("Plan deleted successfully.");
});

// TODO: DELETE specific exercises in the plan
export default router;
