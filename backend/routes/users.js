import express from "express";
import {
  update,
  deleteUser,
  getUser,
  getReviewUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/update/:id", verifyToken, update);

//delete user
router.delete("/delete/:id", verifyToken, deleteUser);

//get a user
router.get("/", getUser);

router.get("/getreview/:id", getReviewUser);

export default router;
