import {
  addExpense,
  deleteExpense,
  getAllExpenses,
  getMonthExpenses,
  getOneExpense,
  updateExpense,
} from "../repository/expensesRepository.js";
import { getActualMonthYear } from "../utils/date.js";
import {
  addExpensesToMonthlyExpenses,
  deletePriceFromOneExpense,
  updateMonthlyExpensePrice,
} from "../repository/monthlyExpensesRepository.js";

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
  const getDateForMonthlyExpenses = new Date(date);

  const newExpense = await addExpense(
    user_id,
    description,
    price,
    category,
    date
  );

  if (newExpense) {
    //Adding the price to the monthly expense
    const dateObj = newExpense.date;
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const addedToMonthlyExpense = await addExpensesToMonthlyExpenses(
      user_id,
      price,
      month,
      year
    );
  }

  return newExpense;
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
