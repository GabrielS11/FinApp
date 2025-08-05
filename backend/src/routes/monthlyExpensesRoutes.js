import express from "express";
import {
  getAllMonthlyExpensesController,
  getSpecificMonthController,
} from "../controller/monthlyExpensesController.js";

const router = express.Router();

router.get("/all", getAllMonthlyExpensesController);

router.get("/specific", getSpecificMonthController);

export default router;
