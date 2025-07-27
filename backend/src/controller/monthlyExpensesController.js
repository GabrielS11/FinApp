import { getAllMonthlyExpensesService } from "../service/monthlyExpensesService.js";
import express from "express";

export async function getAllMonthlyExpensesController(req, res) {
  const user_id = req.user_id;

  const montlhyExpenses = await getAllMonthlyExpensesService(user_id);
  return res.json(montlhyExpenses);
}
