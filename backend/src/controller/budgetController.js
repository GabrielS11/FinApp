import express from "express";

import {
  addBudgetService,
  getAllBudgetService,
  getSpecificBudgetService,
  updateBudgetService,
  deleteBudgetService,
} from "../service/budgetService.js";

export async function getAllBudgetController(req, res) {
  const user_id = req.user_id;

  const allBudgets = await getAllBudgetService(user_id);

  if (!allBudgets) {
    return res.status(400).json({ message: "No budgets found" });
  }

  return res.json(allBudgets);
}

export async function getSpecificBudgetController(req, res) {
  const user_id = req.user_id;
  const { category, month, year } = req.body;

  const specificBudget = await getSpecificBudgetService(
    user_id,
    category,
    month,
    year
  );

  if (!specificBudget) {
    return res.status(400).json({ message: "No budget found" });
  }

  return res.json(specificBudget);
}

export async function addBudgetController(req, res) {
  const user_id = req.user_id;
  const { category, max_price, month, year } = req.body;

  const addedBudget = await addBudgetService(
    user_id,
    category,
    max_price,
    month,
    year
  );

  if (!addedBudget) {
    return res.status(400).json({ message: "Cant add the budget" });
  }

  return res.json(addedBudget);
}

export async function deleteBudgetController(req, res) {
  const user_id = req.user_id;
  const { category, month, year } = req.body;

  const deletedBudget = await deleteBudgetService(
    user_id,
    category,
    month,
    year
  );

  if (!deletedBudget) {
    return res.status(400).json({ message: "Couldnt delete anything" });
  }

  return res.json(deletedBudget);
}

//FINISH UPDATE; AND ADD UPDATE FOR THE USER AND UPDATE FOR ADDING NEW EXPENSES
