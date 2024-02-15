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

router.patch("/:id/update", async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  console.log(newData);
  try {
    let updateUser = await User.findOneAndUpdate({ _id: userId }, newData, {
      returnOriginal: false,
    });
    if (updateUser) {
      console.log(updateUser);
      res.status(200).json(updateUser);
    } else {
      res.status(304);
      console.log("Update unsuccessful.");
    }
  } catch (error) {
    console.log();
  }
});

router.post("/signin", async (req, res) => {
  // user auth
  // console.log(req.body);
  // const checkUser = await User.create(req.body);
  // console.log(checkUser);
  // let compareUser = await User.findOne({ email: checkUser.email });
  // if (compareUser) {
  //   console.log(compareUser);
  // }
});

router.post("/signup", async (req, res) => {
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
