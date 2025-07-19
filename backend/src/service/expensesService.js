import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getMonthExpenses,
  getOneExpense,
  updateExpense,
} from "../repository/expensesRepository.js";
import { getActualMonthYear } from "../utils/date.js";

export async function listMonthExpensesService(user_id) {
  const { month, year } = getActualMonthYear();
  return await getMonthExpenses(user_id, month, year);
}

export async function addExpenseService(
  user_id,
  description,
  price,
  category,
  date
) {
  const { month, year } = getActualMonthYear();
  return await addExpense(
    user_id,
    description,
    price,
    category,
    date,
    month,
    year
  );
}

export async function updateExpenseService(
  id,
  user_id,
  description,
  price,
  category,
  date
) {
  return await updateExpense(id, user_id, description, price, category, date);
}

export async function deleteExpenseService(id, user_id) {
  return await deleteExpense(id, user_id);
}

export async function listAllExpensesService(user_id) {
  return await getAllExpenses(user_id);
}

export async function listOneExpenseService(id, user_id) {
  return await getOneExpense(id, user_id);
}
