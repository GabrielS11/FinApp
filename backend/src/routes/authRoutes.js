/**
 * Auth methods are both working, im using routes -> Controller -> Service -> Repository
 * The routes only define the routes
 * Controller is where I use de requests and give the response
 * In service I apply the business logic
 * And Repository strictly to access the database
 */

import express, { json } from "express";
import {
  loginController,
  registeController,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", registeController);

router.post("/login", loginController);

export default router;
