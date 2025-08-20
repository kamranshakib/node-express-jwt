import express from "express";
import cookieParser from "cookie-parser";

import User from "./Model/user.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser())
app.use(authRoutes);
// view engine
app.set("view engine", "ejs");

// routes 
app.get("/", (req, res) => res.render("home"));

app.listen(3000, () => {
  console.log("localhost 3000");
});
