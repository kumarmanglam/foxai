
const { Router } = require("express");
const {
  loginController,
  addUserController,
  updateUserController,
  deleteUserController,
  getAllUserController,
  getUserController
} = require("../controller/authController.js");
const { requireSignIn, isAdmin } = require('../Middlewares/authMiddleware.js');


const router = Router();

router.post("/login", loginController);
router.post("/addUser", requireSignIn, isAdmin, addUserController);
router.patch("/updateUser/:email_id", requireSignIn, isAdmin, updateUserController);
router.delete("/deleteUser/:email_id", requireSignIn, isAdmin, deleteUserController);
router.get("/getAllUser", getAllUserController);
router.get("/getUserInfo/:email_id", getUserController);



module.exports = router;

