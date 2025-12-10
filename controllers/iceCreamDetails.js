import ICECREAM from "../Model/Model_ice.js";
import User from "../Model/user.js";
import mongoose from "mongoose";

export const showDetails = async (req, res) => {
  const iceCreamId = req.params.id;
  try {
    const ice = await ICECREAM.findById(iceCreamId).lean();
    if (!ice) return res.status(404).send("Product not found");

    const userFavorites = req.user?.favorites || [];

    ice.isFavorite = userFavorites.some(
      (favId) => favId.toString() === ice._id.toString()
    );

    res.render("detailsiceCream", { ice });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "شناسه محصول ارسال نشده!" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربر پیدا نشد!" });
    }

    const objectId = mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : null;

    if (!objectId) {
      return res
        .status(400)
        .json({ success: false, message: "شناسه محصول نامعتبر است!" });
    }

    const index = user.favorites.findIndex((fav) => fav.equals(objectId));

    if (index === -1) {
      user.favorites.push(objectId);
      await user.save();
      return res.json({
        success: true,
        isFavorite: true,
        message: "محصول به علاقه‌مندی‌ها اضافه شد",
        favorites: user.favorites,
      });
    } else {
      user.favorites.splice(index, 1);
      await user.save();
      return res.json({
        success: true,
        isFavorite: false,
        message: "محصول از علاقه‌مندی‌ها حذف شد",
        favorites: user.favorites,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "خطای سرور" });
  }
};
