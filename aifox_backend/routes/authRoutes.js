import { Router } from "express";
import { loginController } from "../controller/authController.js";
import {addUserController} from "../controller/authController.js";
import { requireSignIn, isAdmin } from '../Middlewares/authMiddleware.js'; 
import { updateUserController} from "../controller/authController.js";
import {deleteUserController} from "../controller/authController.js";
import{getAllUserController} from "../controller/authController.js";
import { getUserController } from "../controller/authController.js";
const router = Router();

router.post("/login",loginController);
router.post("/addUser",requireSignIn,isAdmin, addUserController);
router.patch("/updateUser/:email_id",requireSignIn,isAdmin, updateUserController);
router.delete("/deleteUser/:email_id",requireSignIn,isAdmin, deleteUserController);
router.get("/getAllUser", getAllUserController);
router.get("/getUserInfo/:email_id", getUserController);


export default router; 