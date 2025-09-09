import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer({ dest: "public/uploads/" });
import * as authControllers from "../controllers/authControllers.js";
import * as adminPanel from "../controllers/adminPanel.js"
import * as detailsIceCream from "../controllers/iceCreamDetails.js"
import * as requireAdmin from "../middleware/authAdmin.js"
 
router.get("/signup", authControllers.signup);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout);
// admin page
router.get("/admin",requireAdmin.requireAdmin,adminPanel.adminPage)
router.post('/adminPage_post',requireAdmin.requireAdmin, upload.single("image"),adminPanel.adminPage_post)


// ice creams details
router.get("/icecream/:id",detailsIceCream.showDetails)

export default router;
