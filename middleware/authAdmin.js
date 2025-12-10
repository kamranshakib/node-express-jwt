import jwt from "jsonwebtoken";
import User from "../Model/user.js";
import dotenv from "dotenv";
dotenv.config();

export const requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.redirect("/login");
      } else {
        let user = await User.findById(decodedToken.id);

        if (user && user.email === "Admin@gmail.com") {
          res.locals.user = user;
          next();
        } else {
          return res.render("404");
        }
      }
    });
  } else {
    return res.redirect("/login");
  }
};
