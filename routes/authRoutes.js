import express from "express";
const router = express.Router();
import * as authControllers from "../controllers/authControllers.js";

router.get("/signup", authControllers.signup);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout);

router.get("/admin",authControllers.adminPage)

export default router;
