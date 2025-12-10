import ICECREAM from "../Model/Model_ice.js";
import path from "path";

export const adminPage = (req, res) => {
  res.render("admin");
};
export const adminPage_post = async (req, res) => {
  try {
    const { name, flavor, description, price } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    await ICECREAM.create({
      name,
      Flavor: flavor,
      Description: description,
      Price: price,
      imageUrl,
    });

    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const adminPage_delete = async (req, res) => {
  const id = req.params.id;
  try {
    const delIce = await ICECREAM.findByIdAndDelete(id);
    res.redirect("/smoothies");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const adminPage_edit = async (req, res) => {
  const id = req.params.id;
  try {
    const editIce = await ICECREAM.findById(id);
    if (!editIce) {
      res.status(404).json({ msg: "that product is not find" });
    }
    res.render("editProduct", { editIce });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const adminPage_edit2 = async (req, res) => {
  const id = req.params.id;
  try {
    const { name, Flavor, Description, Price } = req.body;

    let imageUrl = req.body.imageUrl;
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    const updateData = { name, Flavor, Description, Price, imageUrl };

    const editIces = await ICECREAM.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!editIces) return res.send("error");

    res.redirect("/smoothies");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
