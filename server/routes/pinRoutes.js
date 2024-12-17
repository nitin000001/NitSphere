import express from 'express'
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../config/multer.js'
import { commentOnPin, createPin, deletePin, getAllPins, getSinglePin, updatePin } from '../controllers/pinControllers.js';

const router = express.Router();

router.post("/new", isAuth, uploadFile, createPin);
router.get("/all", isAuth, getAllPins);
router.get("/:id", isAuth, getSinglePin);
router.post("/comment/:id", isAuth, commentOnPin);
router.delete("/:id", isAuth, deletePin);
router.put("/:id", isAuth, updatePin);

export default router;