import express from "express";
import cookieParser from "cookie-parser";
import * as requireAuth from "./middleware/authMiddleware.js";

import User from "./Model/user.js";
import ICECREAM from "./Model/Model_ice.js";
import authRoutes from "./routes/authRoutes.js";
 
const app = express();


// middleware
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// routes
app.get("*", requireAuth.CheakUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth.requireAuth, async (req, res) =>{
  try {
    const iceCream = await ICECREAM.find();
    res.render("smoothies",{iceCream})

  } catch (error) {
    res.status(400).json({error})
     
    
  }
   

}
  
);
app.use(authRoutes);

app.listen(3000, () => {
  console.log("localhost 3000");
});
