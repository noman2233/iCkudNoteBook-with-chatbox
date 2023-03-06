import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/reviews.js";

const router = express.Router();

router.post("/",verifyToken,createReview )
router.get("/:noteId", getReviews )
router.delete("/:id", deleteReview)

export default router;