import express from "express";
import User from "../Model/user.js";

import mongoose from "mongoose";


export const favorates_add = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "شناسه محصول ارسال نشده!" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "کاربر پیدا نشد!" });

    // تبدیل productId رشته به ObjectId واقعی
    const objectId = mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : null;

    if (!objectId) return res.status(400).json({ success: false, message: "شناسه محصول نامعتبر است!" });

    // بررسی وجود محصول در علاقه‌مندی‌ها
    const index = user.favorites.findIndex(fav => fav.equals(objectId));

    if (index === -1) {
      user.favorites.push(objectId); // فقط ObjectId push کن
      await user.save();
      return res.json({ success: true, message: "محصول به علاقه‌مندی‌ها اضافه شد ✅", favorites: user.favorites });
    } else {
      user.favorites.splice(index, 1);
      await user.save();
      return res.json({ success: true, message: "محصول از علاقه‌مندی‌ها حذف شد ❌", favorites: user.favorites });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطای سرور" });
  }
};
