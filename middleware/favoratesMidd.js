// middleware/favorites.js
import User from "../Model/user.js";

export const setFavorites = async (req, res, next) => {
  res.locals.favorates = [];
  if (req.user) {
    try {
      const user = await User.findById(req.user.id).populate("favorites");
      if (user && user.favorites) {
        res.locals.favorates = user.favorites;
      }
    } catch (err) {
      console.error(err);
    }
  }
  next();
};
