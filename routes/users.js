import { Router } from "express";
import User from "../models/user.js";

const router = new Router();

router.get("/:id", async (req, res) => {
  try {
    // return specific user's data
    let userId = req.params.id;
    let currentUser = await User.findById(userId);
    if (currentUser) res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
  }
});

// TODO: Route for updating account info

router.post("/signin", async (req, res) => {
  // user auth
  const { email, password } = req.body;
  User.verifyPassword(password, function (err, valid) {
    if (err) console.log(err);
    else if (valid) console.log("valid password");
    else console.log("Invalid password");
  });
});

router.post("/signup", async (req, res) => {
  // const {firstName, lastName, email, password} = req.body;
  try {
    // check if email is registered in db
    if (await User.exists({ email: req.body.email })) {
      console.log("Email already registered");
      console.log(req.body.email);
      res.status(304);
    } else {
      // create new user
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
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
