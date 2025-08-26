import jwt from "jsonwebtoken";

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
