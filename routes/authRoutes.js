import express from "express";
import upload from "../confiq/upload.js";
import * as authControllers from "../controllers/authControllers.js";
import * as adminPanel from "../controllers/adminPanel.js";
import * as detailsIceCream from "../controllers/iceCreamDetails.js";
import * as requireAdmin from "../middleware/authAdmin.js";
import * as favorate from "../controllers/favorates.js"
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/signup", authControllers.signup);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout);
 
// admin page 
router.get("/admin", requireAdmin.requireAdmin, adminPanel.adminPage);
router.post("/adminPage_post",requireAdmin.requireAdmin,upload.single("image"),adminPanel.adminPage_post); 

router.post('/adminPage_delete/:id',adminPanel.adminPage_delete)
router.get('/adminPage_edit/:id',adminPanel.adminPage_edit)
router.post('/adminPage_edit2/:id',upload.single("image"),adminPanel.adminPage_edit2)


// ice creams details
router.get("/icecream/:id", detailsIceCream.showDetails);


// Favorates 
router.post("/favorites/add",requireAuth, favorate.favorates_add)
router.get('/favorates',requireAuth,favorate.get_favorates)

export default router;
