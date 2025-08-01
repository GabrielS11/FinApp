import prisma from "../prismaClient.js";

/**
 * Adicionar as categorias, caso ja exista adicionar so o valor
 * caso de delete ou update tambem atualizar
 * e depois adicionar o endpoint de GET categorias
 *
 *
 * buscar todas ///// Buscar as deste mes //// buscar por categoria ////// buscar por categoria para atualizar
 *
 *
 *
 *
 * MUDAR O MONTHLYEXPENSES PARA TER A LOGICA NO SERVICE!!!!!!!!!!!!!!!!!!!!!!!!!
 */

export async function getCategoriesByUserId(user_id) {
  return await prisma.category_expenses.findMany({
    where: {
      user_id: user_id,
    },
  });
}

export async function getCategoriesByUserIdMonthYear(user_id, month, year) {
  return await prisma.category_expenses.findMany({
    where: {
      user_id: user_id,
      month: month,
      year: year,
    },
  });
}

export async function getCategoriesByUserIdCategory(
  user_id,
  category,
  month,
  year
) {
  const optimizedCategory = category.toLowerCase();

  return await prisma.category_expenses.findMany({
    where: {
      user_id: user_id,
      category: optimizedCategory,
      month: month,
      year: year,
    },
  });
}

export async function addExpensesToCategoryExpenses(
  user_id,
  price,
  category,
  month,
  year
) {
  return await prisma.category_expenses.create({
    data: {
      user_id: user_id,
      price: price,
      category: category,
      month: month,
      year: year,
    },
  });
}

export async function updateExpensesToCategoryExpenses(
  user_id,
  price,
  category,
  month,
  year
) {
  return await prisma.category_expenses.update({
    where: {
      user_id: user_id,
      category: category,
      month: month,
      year: year,
    },
    data: {
      price: price,
    },
  });
}

export async function deleteExpenseFromCategoryExpense(
  user_id,
  category,
  price,
  month,
  year
) {
  return await prisma.category_expenses.update({
    where: {
      user_id: user_id,
      category: category,
      month: month,
      year: year,
    },
    data: {
      price: price,
    },
  });
}
