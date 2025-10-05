import express from "express";
import User from "../Model/user.js";
 
import mongoose from "mongoose";

 
export const favorates_add = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "شناسه محصول ارسال نشده!" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "کاربر پیدا نشد!" });


    const objectId = mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : null;

    if (!objectId) return res.status(400).json({ success: false, message: "شناسه محصول نامعتبر است!" });

 
    const index = user.favorites.findIndex(fav => fav.equals(objectId));

    if (index === -1) {
      user.favorites.push(objectId); 
      await user.save();
      return res.json({ success: true, message: "محصول به علاقه‌مندی‌ها اضافه شد ", favorites: user.favorites });
    } else {
      user.favorites.splice(index, 1);
      await user.save();
      return res.json({ success: true, message: "محصول از علاقه‌مندی‌ها حذف شد ", favorites: user.favorites });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطای سرور" });
  }
};

export const get_favorates = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    if (!user) {
      return res.render("404");
    }

    res.render("favorates", { favorates: user.favorites });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const favorites_delete = async (req, res) => {
  try {
    const productId = req.params.id;
    // const { productId } = req.body;
    const user = req.user;
    if (!user) return res.status(401).send("Not authenticated");

    user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
    await user.save();
    res.redirect("/favorates")

   
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
