import {
  getBudgetsByUserID,
  getBudgetByCategory,
  addBudget,
  updateBudget,
  deleteBudget,
} from "../repository/budgetRepository.js";
import { isValidBigDecimal } from "../utils/verifyDecimalValue.js";

export async function getAllBudgetService(user_id) {
  return await getBudgetsByUserID(user_id);
}

export async function getSpecificBudgetService(user_id, category, month, year) {
  const optimizedCategory = category.toLowerCase();
  return await getBudgetByCategory(user_id, optimizedCategory, month, year);
}

export async function addBudgetService(
  user_id,
  category,
  max_price,
  month,
  year
) {
  const validDecimal = isValidBigDecimal(max_price, 10, 2);
  const optimizedCategory = category.toLowerCase();

  if (!validDecimal) {
    throw new Error("Max price not acceptable");
  }

  return await addBudget(user_id, optimizedCategory, max_price, month, year);
}

export async function updateBudgetService(
  user_id,
  category,
  max_price,
  month,
  year
) {
  const validDecimal = isValidBigDecimal(max_price, 10, 2);
  const optimizedCategory = category.toLowerCase();

  if (!validDecimal) {
    throw new Error("Max price not acceptable");
  }

  return await updateBudget(user_id, optimizedCategory, max_price, month, year);
}

export async function deleteBudgetService(user_id, category, month, year) {
  const optimizedCategory = category.toLowerCase();

  return await deleteBudget(user_id, optimizedCategory, month, year);
}

// GOTTA TEST EVERYTHIN
