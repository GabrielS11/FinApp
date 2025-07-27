import { getMontlyExpensesByUserId } from "../repository/monthlyExpensesRepository.js";

export async function getAllMonthlyExpensesService(user_id) {
  return await getAllMonthlyExpenses(user_id);
}
