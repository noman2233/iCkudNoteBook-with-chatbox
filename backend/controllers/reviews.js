import Review from "../models/review.js";
import Note from "../models/Note.js";
import { createError } from "../error.js";

export const createReview = async (req, res, next) => {
  const newReview = new Review({
    userId: req.user.user.id , 
    noteId: req.body.noteId,
    desc: req.body.desc,
    star: req.body.star,
  });
  // console.log(req.UserId, req.user)
    try {
    const review = await Review.findOne({
      noteId: req.body.noteId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this note!")
      );

    const savedReview = await newReview.save();

    await Note.findByIdAndUpdate(req.body.noteId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ noteId: req.params.noteId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
