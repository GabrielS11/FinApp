import prisma from "../prismaClient.js";

export async function getMontlyExpensesByUserId(user_id) {
  return await prisma.monthly_expenses.findMany({
    where: {
      user_id: user_id,
    },
  });
}

export async function getMontlyExpensesByUserIdMonthYear(user_id, month, year) {
  const thisMonthsExpenses = await prisma.monthly_expenses.findFirst({
    where: {
      user_id: user_id,
      month: month,
      year: year,
    },
  });
  return thisMonthsExpenses;
}

export async function addExpensesToMonthlyExpenses(
  user_id,
  price,
  month,
  year
) {
  const monthsExpenses = await getMontlyExpensesByUserIdMonthYear(
    user_id,
    month,
    year
  );

  if (!monthsExpenses) {
    return await createMonthlyExpense(user_id, price, month, year);
  }

  const total = Number(monthsExpenses.price) + Number(price);

  const updatedMonthlyExpenses = await prisma.monthly_expenses.update({
    where: {
      id: monthsExpenses.id,
    },
    data: {
      price: total,
    },
  });

  return updatedMonthlyExpenses;
}

export async function createMonthlyExpense(user_id, price, month, year) {
  return await prisma.monthly_expenses.create({
    data: {
      user_id: user_id,
      price: price,
      month: month,
      year: year,
    },
  });
}

export async function deletePriceFromOneExpense(user_id, month, year, price) {
  const monthlyExpense = await getMontlyExpensesByUserIdMonthYear(
    user_id,
    month,
    year
  );

  const finalPrice = Number(monthlyExpense.price) - Number(price);

  await prisma.monthly_expenses.update({
    where: {
      id: monthlyExpense.id,
    },
    data: {
      price: finalPrice,
    },
  });
}

export async function updateMonthlyExpensePrice(user_id, month, year, price) {
  const monthlyExpense = await getMontlyExpensesByUserIdMonthYear(
    user_id,
    month,
    year
  );

  const finalPrice = Number(monthlyExpense.price) + Number(price);

  const updatedMonthlyExpense = await prisma.monthly_expenses.update({
    where: {
      id: monthlyExpense.id,
    },
    data: {
      price: finalPrice,
    },
  });
}
