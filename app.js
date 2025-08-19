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



app.get('/set-cookies',(req,res)=>{

  res.cookie('newUser',true,{maxAge: 100*60*60,httpOnly:true})
  res.cookie('isEmployee',true)
  res.send('get cookies')
})

app.get('/get-cookie',(req,res)=>{
  const cookies = req.cookies;
  res.json(cookies)
})





app.listen(3000, () => {
  console.log("localhost 3000");
});
