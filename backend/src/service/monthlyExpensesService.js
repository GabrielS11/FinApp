import { getMontlyExpensesByUserId } from "../repository/monthlyExpensesRepository.js";

export async function getAllMonthlyExpensesService(user_id) {
  return await getMontlyExpensesByUserId(user_id);
}
