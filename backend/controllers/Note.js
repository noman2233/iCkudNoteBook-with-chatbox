import Note from "../models/Note.js";
import { createError } from "../error.js";

export const addNote = async (req, res, next) => {
  const newNote = new Note({ userId: req.user.user.id, ...req.body });
  // console.log(req.UserId, req.user)
  try {
    const save = await newNote.save();
    res.status(200).json(save);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req, res, next) => {
  const user = await Note.findById(req.params.id);
  if (!user) {
    res.status(400).json("Cannot find note");
  }
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedNote);
};

export const deleteNote = async (req, res, next) => {
  const deleteuser = await Note.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteuser);
};

export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.user.id });

    res.json(notes)
} catch (error) {
    console.error('The error is ',error.message);
    res.status(500).send("Internal Server Error");
}
};

export const randomNote = async (req, res, next) => {
  try {
    const notes = await Note.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
}

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const notes = await Note.find({
      title: { $regex: query, $options: "i" },
    }).limit(10);
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};
