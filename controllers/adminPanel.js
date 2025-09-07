import ICECREAM from "../Model/Model_ice.js";
import path from "path";

export const adminPage =(req,res)=>{
    res.render('admin')
}

export const adminPage_post = async (req, res) => {
  try {
    
    const imagePath = req.file ? "uploads/" + req.file.filename : null;


    
    const newIceCream = await ICECREAM.create({
      name: req.body.name,
      Flavor: req.body.flavor,
      Description: req.body.description,
      Price: req.body.price,
      image: imagePath 
    });
 
    console.log("New Ice Cream Added:", newIceCream);
    
   
    res.redirect("/"); // بعد از ذخیره به صفحه اصلی میریم

  } catch (error) {
    console.log(error);
    res.status(500).send("Error while adding ice cream");
  }
};
