import express from "express";
import {
  getAllCategoryExpensesController,
  getThisMonthsCategoryExpensesController,
  getSpecificCategoryExpensesController,
} from "../controller/categoryExpensesController.js";

const router = express.Router();

router.get("/get-all", getAllCategoryExpensesController);

router.get("/month", getThisMonthsCategoryExpensesController);

router.get("/specific", getSpecificCategoryExpensesController);

export default router;
