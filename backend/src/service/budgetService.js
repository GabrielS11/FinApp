import {
  getBudgetsByUserID,
  getBudgetByCategory,
  addBudget,
  updateBudget,
  deleteBudget,
  updateBudgetPrice,
} from "../repository/budgetRepository.js";

import { addAlertsService } from "./alertsService.js";

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

export async function updateBudgetPriceService(
  user_id,
  category,
  month,
  year,
  price
) {
  const beforeUpdateBudget = await getBudgetByCategory(
    user_id,
    category,
    month,
    year
  );

  if (!beforeUpdateBudget) {
    throw new Error("Couldnt find the budget");
  }

  const newPrice = price + beforeUpdateBudget.max_price;

  const updatedBudgetPrice = await updateBudgetPrice(
    beforeUpdateBudget.id,
    newPrice
  );

  const current_price = updatedBudgetPrice.current_price;
  const max_price = updatedBudgetPrice.max_price;

  if ((current_price >= max_price * 0, 90)) {
    const message = `The max price on ${category}, is already 90% filled.`;
    const alert = await addAlertsService(user_id, "Budget", message);
    return alert;
  }

  return updatedBudgetPrice;
}
