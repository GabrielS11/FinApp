import prisma from "../prismaClient.js";

export async function getBudgetsByUserID(user_id) {
  return await prisma.budget.findMany({
    where: {
      user_id: user_id,
    },
  });
}

export async function getBudgetByCategory(user_id, category, month, year) {
  return await prisma.budget.findFirst({
    where: {
      user_id: user_id,
      category: category,
      month: month,
      year: year,
    },
  });
}

export async function getMonthBudget(user_id, category, month, year) {
  return await prisma.budget.findMany({
    where: {
      user_id: user_id,
      month: month,
      year: year,
    },
  });
}

export async function addBudget(user_id, category, max_price, month, year) {
  return await prisma.budget.create({
    data: {
      user_id: user_id,
      category: category,
      max_price: Number(max_price).toFixed(2),
      month: month,
      year: year,
    },
  });
}

export async function updateBudget(user_id, category, max_price, month, year) {
  const budget = await getBudgetByCategory(
    user_id,
    category,
    max_price,
    month,
    year
  );

  return await prisma.budget.update({
    where: {
      id: budget.id,
    },
    data: {
      category: category,
      max_price: Number(max_price).toFixed(2),
      month: month,
      year: year,
    },
  });
}

export async function deleteBudget(user_id, category, month, year) {
  const budgetToBeDeleted = await getBudgetByCategory(
    user_id,
    category,
    month,
    year
  );

  return await prisma.budget.delete({
    where: {
      id: budgetToBeDeleted.id,
    },
  });
}
