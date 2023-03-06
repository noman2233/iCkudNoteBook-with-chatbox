import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import NotesRoutes from "./routes/notes.js";
import reviewRoutes from "./routes/reviews.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
 

const app = express();
dotenv.config();


// Connection to database MongoDB

const connect = () => {
  mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    throw err;
  });
};

// host and Port name
const port = 80;
const hostname = "127.0.0.1";

//middlewares
app.use(cors())
app.use(cookieParser());
app.use(express.json());

//Api routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", NotesRoutes);
app.use("/api/reviews", reviewRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


// app listning
app.listen(port, hostname, () => {
  connect()
  console.log(`App is running at port http://${hostname}:${port} `);
});
