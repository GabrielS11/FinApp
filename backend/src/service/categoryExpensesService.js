import {
  deleteExpenseFromCategoryExpense,
  getCategoriesByUserIdCategory,
  addExpensesToCategoryExpenses,
  updateExpensesToCategoryExpenses,
  getCategoriesByUserId,
  getCategoriesByUserIdMonthYear,
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
  const optimizedCategory = category.toLowerCase();
  const checkIfExpenseExists = await getCategoriesByUserIdCategory(
    user_id,
    optimizedCategory,
    month,
    year
  );

  if (!checkIfExpenseExists) {
    throw new Error("Category doesnt exist");
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

export async function getAllCategoryExpensesService(user_id) {
  return await getCategoriesByUserId(user_id);
}

export async function getThisMonthsCategoryExpensesService(
  user_id,
  month,
  year
) {
  return await getCategoriesByUserIdMonthYear(user_id, month, year);
}

export async function getSpecificCategoryExpensesService(
  user_id,
  category,
  month,
  year
) {
  const optimizedCategory = category.toLowerCase();
  return await getCategoriesByUserIdCategory(
    user_id,
    optimizedCategory,
    month,
    year
  );
}
