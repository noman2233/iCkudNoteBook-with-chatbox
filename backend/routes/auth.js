import express from "express";
import { signin, signup } from "../controllers/auth.js";
import User from "../models/User.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);
router.get("/find/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ exists: true });
    }

    res.json({ exists: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//SIGN IN
router.post("/signin", signin);

export default router;
