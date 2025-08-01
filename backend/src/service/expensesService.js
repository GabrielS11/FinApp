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
import {
  deleteExpenseFromCategoryExpenseService,
  addExpensesToCategoryExpensesService,
  updateExpensesToCategoryExpensesService,
} from "../service/categoryExpensesService.js";

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
  // const getDateForMonthlyExpenses = new Date(date);
  const optimizedCategory = category.toLowerCase();

  const newExpense = await addExpense(
    user_id,
    description,
    price,
    optimizedCategory,
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
    const addedToCategoryExpense = await addExpensesToCategoryExpensesService(
      user_id,
      price,
      optimizedCategory,
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
  //Doing this to store the original price so we can see if we have to change
  //in the monthly price
  const currentExpense = await getOneExpense(id, user_id);
  const startingPrice = Number(currentExpense.price);

  const updatedExpense = await updateExpense(
    id,
    user_id,
    description,
    price,
    category,
    date
  );

  if (updatedExpense) {
    const changedPrice = Number(updatedExpense.price);
    const dateObj = updatedExpense.date;
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    if (startingPrice != changedPrice) {
      const diference = changedPrice - startingPrice;
      const updatedMonthlyExpense = await updateMonthlyExpensePrice(
        user_id,
        month,
        year,
        diference
      );

      const update = await updateExpensesToCategoryExpensesService(
        user_id,
        diference,
        category,
        month,
        year
      );
    }
  }

  return updatedExpense;
}

export async function deleteExpenseService(id, user_id) {
  const deletedExpense = await deleteExpense(id, user_id);
  if (deletedExpense) {
    //Collecting data to use in the following functions
    const price = deletedExpense.price;
    const category = deletedExpense.category;
    const dateObj = deletedExpense.date;
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    //Using the data collected
    const deleteFromMonthlyExpense = await deletePriceFromOneExpense(
      user_id,
      month,
      year,
      price
    );
    const deleteFromCategoryExpense =
      await deleteExpenseFromCategoryExpenseService(
        user_id,
        category,
        price,
        month,
        year
      );
  }

  return;
}

export async function listAllExpensesService(user_id) {
  return await getAllExpenses(user_id);
}

export async function listOneExpenseService(id, user_id) {
  return await getOneExpense(id, user_id);
}
