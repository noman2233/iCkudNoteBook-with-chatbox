import express from "express";
const router = express.Router();
import {
  addNote,
  deleteNote,
  getAllNotes,
  getNote,
  randomNote,
  search,
  updateNote,
} from "../controllers/Note.js";
import Note from "../models/Note.js";
import { verifyToken } from "../verifyToken.js";

router.get("/fetchallnotes",verifyToken, getAllNotes);
router.post("/addnote", verifyToken, addNote);
router.put("/update/:id", updateNote);
router.delete("/delete/:id",verifyToken, deleteNote);
router.get("/findnote/:id", getNote);
router.get("/random", randomNote);
router.get("/search", search);
router.get("/getoneproduct/:id", async (req, res) => {
  const oneProduct = await Note.findById(req.params.id);
  res.status(200).json(oneProduct);
});

export default router;
