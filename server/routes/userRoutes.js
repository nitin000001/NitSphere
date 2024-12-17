import express from "express";
import { followAndUnfollow, loginUser,  logOut,  myProfile, registerUser, userProfile } from "../controllers/usercontroller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router(); 

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logOut);
router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.get("/follow/:id", isAuth, followAndUnfollow);

export default router;
