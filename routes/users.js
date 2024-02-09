import { Router } from "express";
import User from "../models/user.js";

const router = new Router();
// let db = connection;

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/:id", async (req, res) => {
  // check if user/pw is valid
  let userId = req.params.id;
  // let currentUser = await
});

router.post("/signin", async (req, res) => {
  // user auth
});

router.post("/signup", async (req, res) => {
  // check if email is registered in db

  // create new user
  const newUser = await User.create(req.body);
  console.log(newUser);
  res.json(newUser);

  // send the new user
  await newUser.save();
});

router.delete("/:id/settings", async (req, res) => {});

export default router;
