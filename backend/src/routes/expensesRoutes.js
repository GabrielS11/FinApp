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

router.get("/mes-atual", listMonthExpensesController);

router.post("/add-expense", addExpenseController);

router.put("/update-expense", updateExpenseController);

router.delete("/delete-expense", deleteExpenseController);

router.get("/all-expenses", listAllExpensesController);

router.get("/one-expense", listOneExpenseController);

export default router;
