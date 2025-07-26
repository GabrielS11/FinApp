import express from "express";
import prisma from "../prismaClient.js";
import {
  listMonthExpensesController,
  addExpenseController,
  updateExpenseController,
  deleteExpenseController,
  listAllExpensesController,
  listOneExpenseController,
} from "../controller/expensesController.js";

const router = express.Router();

router.get("/current-month", listMonthExpensesController);

router.post("/add-expense", addExpenseController);

router.put("/update-expense/:id", updateExpenseController);

router.delete("/delete-expense/:id", deleteExpenseController);

router.get("/all-expenses", listAllExpensesController);

router.get("/one-expense/:id", listOneExpenseController);

export default router;
