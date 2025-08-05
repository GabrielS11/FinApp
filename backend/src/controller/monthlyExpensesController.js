import {
  getAllMonthlyExpensesService,
  getSpecificMonthService,
} from "../service/monthlyExpensesService.js";
import express from "express";

export async function getAllMonthlyExpensesController(req, res) {
  const user_id = req.user_id;

  const allMontlhyExpenses = await getAllMonthlyExpensesService(user_id);
  return res.json(allMontlhyExpenses);
}

export async function getSpecificMonthController(req, res) {
  const user_id = req.user_id;
  const { month, year } = req.body;

  try {
    const specificMonth = await getSpecificMonthService(user_id, month, year);
    if (!specificMonth) {
      return res.json({
        message: `Couldnt find any expenses in ${month}/${year}`,
      });
    }
    return res.json(specificMonth);
  } catch (error) {
    console.log(`Where: In monthlyExpensesController
      Error:
      ${error}
      `);
  }
}
