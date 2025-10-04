import jwt from "jsonwebtoken";
import User from "../Model/user.js";
import dotenv from "dotenv";
dotenv.config();

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(" Token from Cookie:", token); 

  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log(" User not found in DB");
      return res.redirect("/login");
    }

    req.user = user;

    next();
  } catch (err) {
    res.redirect("/login");
  }
};

// cheak user
export const CheakUser = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          req.user = null; 
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          req.user = user; 
          next();
        }
      });
    } else {
      res.locals.user = null;
      req.user = null; 
      next();
    }
  } catch (error) {
    res.locals.user = null;
    req.user = null;
    next();
  }
};
