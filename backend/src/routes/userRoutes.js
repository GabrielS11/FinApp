import express from "express";
import {
  listUserDetailsController,
  deleteUserController,
  updateUserController,
} from "../controller/userController.js";

const router = express.Router();

router.get("/info", listUserDetailsController);

router.delete("/delete", deleteUserController);

router.put("/edit", updateUserController);

export default router;
