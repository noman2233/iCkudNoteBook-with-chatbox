import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    // },
    // followers: {               
    //   type: Array,
    //   default: [],
    // },
    // followings: {
    //   type: Array,
    //   default: [],
    // },
    // fromGoogle: {
    //   type: Boolean,
    //   default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
