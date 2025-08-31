import jwt from "jsonwebtoken";
import User from "../Model/user.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "KB it means Kamran Bahar", (err, decoded) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// cheak user

export const CheakUser = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (token) {
       jwt.verify(token,"KB it means Kamran Bahar", async (err, decodedToken) => {
          if (err) {
            res.locals.user = null;
            next();
          } else {
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
          }
        }
      );
    } else {
      res.locals.user = null;
      next()
    }
  } catch (error) {}
};
