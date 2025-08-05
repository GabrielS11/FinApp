import {
  getMontlyExpensesByUserId,
  getMontlyExpensesByUserIdMonthYear,
} from "../repository/monthlyExpensesRepository.js";

export async function getAllMonthlyExpensesService(user_id) {
  return await getMontlyExpensesByUserId(user_id);
}

export async function getSpecificMonthService(user_id, month, year) {
  return await getMontlyExpensesByUserIdMonthYear(user_id, month, year);
}
