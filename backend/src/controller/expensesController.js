import express from "express";
import {
  addExpenseService,
  deleteExpenseService,
  listMonthExpensesService,
  updateExpenseService,
  listAllExpensesService,
  listOneExpenseService,
} from "../service/expensesService.js";

export async function listMonthExpensesController(req, res) {
  const user_id = req.user_id;
  const despesas = await listMonthExpensesService(user_id);
  return res.json(despesas);
}

export async function addExpenseController(req, res) {
  const user_id = req.user_id;
  const { description, price, category, date } = req.body;

  if (!price || !date) {
    return res.status(400).json({
      message: "One of the required fields is missing: Price or Date",
    });
  }
  const newExpense = await addExpenseService(
    user_id,
    description,
    price,
    category,
    date
  );

  res.json(newExpense);
}

export async function updateExpenseController(req, res) {
  const { id } = req.body;
  const { description, price, category, date } = req.params;
  const user_id = req.user_id;

  if (!price || !date) {
    return res.status(400).json({
      message: "One of the required fields is missing: Price or Date",
    });
  }

  const updateExpense = await updateExpenseService(
    id,
    user_id,
    description,
    price,
    category,
    date
  );
  res.json(updateExpense);
}

export async function deleteExpenseController(req, res) {
  const { id } = req.params;
  const user_id = req.user_id;
  await deleteExpenseService(id, user_id);
  res.json({ message: "Expense deleted" });
}

export async function listAllExpensesController(req, res) {
  const user_id = req.user_id;
  const expenses = await listAllExpensesService(user_id);
  res.json(expenses);
}

export async function listOneExpenseController(req, res) {
  const user_id = req.user_id;
  const { id } = req.params;
  const expense = await listOneExpenseService(id, user_id);
  res.json(expense);
}
