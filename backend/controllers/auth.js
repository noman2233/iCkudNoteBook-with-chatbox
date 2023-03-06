import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//  registration
export const signup = async (req, res, next) => {
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({
        success,
        error: "Sorry a user with this email already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    let success = true;
    res.status(200).json({ success, newUser });
  } catch (err) {
    next(err);
  }
};

// login controller
export const signin = async (req, res, next) => {
  let success = false;
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.SECRET_KEY);
    success = true;
    res.json({ success, authtoken });
  } catch (err) {
    next(err);
  }
};
