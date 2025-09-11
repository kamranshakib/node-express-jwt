import ICECREAM from "../Model/Model_ice.js";
import path from "path";

export const adminPage = (req, res) => {
  res.render("admin");
};
export const adminPage_post = async (req, res) => {
  try {
    const { name, flavor, description, price } = req.body;

    // URL عکس آپلود شده روی Cloudinary
    const imageUrl = req.file ? req.file.path : null;

    await ICECREAM.create({
      name,
      Flavor: flavor,
      Description: description,
      Price: price,
      imageUrl
    });

    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


