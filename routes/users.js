import { Router } from "express";
import User from "../models/user.js";

const router = new Router();

router.get("/:id", async (req, res) => {
  // return specific user's data
  let userId = req.params.id;
  let currentUser = await User.findById(userId);
  res.status(200).json(currentUser);
});

// TODO: Route for updating account info

router.post("/signin", async (req, res) => {
  // user auth
});

router.post("/signup", async (req, res) => {
  // check if email is registered in db
  if (await User.exists({ email: req.body.email })) {
    // TODO: Alert user email is already associated with an account
    console.log("Email already registered");
    console.log(req.body.email);
    return;
  } else {
    // create new user
    const newUser = await User.create(req.body);
    console.log(newUser._id);
    res.status(200).json(newUser._id);
  }
});

router.delete("/:id/delete", async (req, res) => {
  let userId = req.params.id;
  try {
    let deleteUser = await User.deleteOne({ _id: userId });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("Account deleted successfully.");
});

export default router;
