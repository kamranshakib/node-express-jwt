import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer({ dest: "public/uploads/" });
import * as authControllers from "../controllers/authControllers.js";
import * as adminPanel from "../controllers/adminPanel.js"

router.get("/signup", authControllers.signup);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout);

router.get("/admin",adminPanel.adminPage)
router.post('/adminPage_post', upload.single("image"),adminPanel.adminPage_post)

export default router;
