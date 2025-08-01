import {
  deleteExpenseFromCategoryExpense,
  getCategoriesByUserIdCategory,
  addExpensesToCategoryExpenses,
  updateExpensesToCategoryExpenses,
} from "../repository/categoryExpensesRepository.js";

export async function deleteExpenseFromCategoryExpenseService(
  user_id,
  category,
  price,
  month,
  year
) {
  const categoryExpenseBeforeDelete = await getCategoriesByUserIdCategory(
    user_id,
    category,
    month,
    year
  );
  const pricebeforeChange = categoryExpenseBeforeDelete.price;

  const calculatedPrice = Number(pricebeforeChange) - Number(price);

  const deletedExpense = await deleteExpenseFromCategoryExpense(
    user_id,
    category,
    calculatedPrice,
    month,
    year
  );
}

export async function addExpensesToCategoryExpensesService(
  user_id,
  price,
  category,
  month,
  year
) {
  const checkIfExpenseExists = await getCategoriesByUserIdCategory(
    user_id,
    category,
    month,
    year
  );

  if (!checkIfExpenseExists) {
    return await addExpensesToCategoryExpenses(
      user_id,
      price,
      category,
      month,
      year
    );
  }

  return await updateExpensesToCategoryExpenses(
    user_id,
    price,
    category,
    month,
    year
  );
}
