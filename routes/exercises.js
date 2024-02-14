import { Router } from "express";
import ExercisePlan from "../models/exercisePlan.js";

const router = new Router();

// Create new plan
router.post("/", async (req, res) => {
  try {
    const newPlan = await ExercisePlan.create(req.body);
    res.status(203).json(newPlan);
  } catch (error) {
    console.log(error);
  }
})

// GET All Plans by owner field
router.get("/owner/:id", async (req, res) => {
  const ownerId = req.params.id;
  const plans = await ExercisePlan.find({ owner: ownerId });
  res.status(200).json(plans);
});

// DELETE all plans by owner field
router.delete("/owner/:id", async (req, res) => {
  const ownerId = req.params.id;
  const delPlans = await ExercisePlan.deleteMany({ owner: ownerId });
  
  if (delPlans) res.status(200).send("All plans deleted successfully.");
  else {
    res.status(404);
  }
});

// GET active plan
// TODO: Remove; add route to update active plan (goes to user router)
router.get("/:id", async (req, res) => {
  const ownerId = req.params.id;
  let activePlan = await ExercisePlan.find({ active: true });
  res.status(200).json(activePlan);
});

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
