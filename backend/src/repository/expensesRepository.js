import prisma from "../prismaClient.js";
import {
  addExpensesToMonthlyExpenses,
  deletePriceFromOneExpense,
  updateMonthlyExpensePrice,
} from "./monthlyExpensesRepository.js";

export async function getMonthExpenses(user_id, mes, ano) {
  return await prisma.expenses.findMany({
    where: {
      user_id: user_id,
      is_deleted: false,
      date: {
        gte: new Date(`${ano}-${String(mes).padStart(2, "0")}-01`),
        lt: new Date(`${ano}-${String(mes + 1).padStart(2, "0")}-01`),
      },
    },
    orderBy: { date: "desc" },
  });
}

export async function addExpense(
  user_id,
  description,
  price,
  category,
  date,
  current_month,
  current_year
) {
  const newExpense = await prisma.expenses.create({
    data: {
      user_id: user_id,
      description: description,
      price: price,
      category: category,
      date: date,
    },
  });

  //Adding the price to the monthly expense
  const addedToMonthlyExpense = await addExpensesToMonthlyExpenses(
    user_id,
    price,
    current_month,
    current_year
  );

  return newExpense;
}

export async function updateExpense(
  id,
  user_id,
  description,
  price,
  category,
  date
) {
  //Checking if the price changed to see if we need to update the monthly expense
  const expense = await getOneExpense(id, user_id);
  const startingPrice = Number(expense.price);

  const updatedExpense = await prisma.expenses.update({
    where: {
      id: parseInt(id),
      user_id,
    },
    data: {
      description,
      price,
      category,
      date,
    },
  });

  const changedPrice = Number(updatedExpense.price);
  const dateObj = updatedExpense.date;
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  if (startingPrice != changedPrice) {
    const diference = changedPrice - startingPrice;
    const updatedmonthlyExpense = await updateMonthlyExpensePrice(
      user_id,
      month,
      year,
      diference
    );
  }

  return updatedExpense;
}

export async function deleteExpense(id, user_id) {
  const deletedExpense = await prisma.expenses.update({
    where: {
      id: id,
      user_id: user_id,
    },
    data: {
      is_deleted: true,
    },
  });

  //Deleting it in the monthly expenses so there isnt any errors
  const price = deletedExpense.price;
  const dateObj = deletedExpense.date;

  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const deleteFromMonthlyExpense = await deletePriceFromOneExpense(
    user_id,
    month,
    year,
    price
  );
}

export async function getAllExpenses(user_id) {
  return await prisma.expenses.findMany({
    where: {
      user_id: user_id,
      is_deleted: false,
    },
    orderBy: { date: "desc" },
  });
}

export async function getOneExpense(id, user_id) {
  return await prisma.expenses.findUnique({
    where: {
      id: id,
      user_id: user_id,
      is_deleted: false,
    },
  });
}
