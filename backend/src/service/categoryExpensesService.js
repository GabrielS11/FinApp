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

  const categoryId = categoryExpenseBeforeDelete.id;
  const pricebeforeChange = categoryExpenseBeforeDelete.price;

  const calculatedPrice = Number(pricebeforeChange) - Number(price);

  const deletedExpense = await deleteExpenseFromCategoryExpense(
    categoryId,
    calculatedPrice
  );
  console.log(deletedExpense);
  return deletedExpense;
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

  const startingPrice = checkIfExpenseExists.price;
  const finalPrice = Number(startingPrice) + Number(price);
  const categoryID = checkIfExpenseExists.id;

  return await updateExpensesToCategoryExpenses(categoryID, finalPrice);
}

export async function updateExpensesToCategoryExpensesService(
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
    throw new Error("CAtegory doesnt exists");
  }

  const startingPrice = checkIfExpenseExists.price;
  const finalPrice = Number(startingPrice) + Number(price);
  const categoryID = checkIfExpenseExists.id;

  const updatedExpense = await updateExpensesToCategoryExpenses(
    categoryID,
    finalPrice
  );

  return updatedExpense;
}
