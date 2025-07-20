import prisma from "../prismaClient.js";

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
  //Check to see if it is alredy created, if not we create and put the aggregate inside
  //To do !!!!
  const addingToMonthlyExpenses = await prisma.monthly_expenses.upsert({
    where: {
      user_id: user_id,
      month: current_month,
      year: current_year,
    },
  });

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
  return updatedExpense;
}

export async function deleteExpense(id, user_id) {
  await prisma.expenses.update({
    where: {
      id: id,
      user_id: user_id,
    },
    data: {
      is_deleted: true,
    },
  });
}

export async function getAllExpenses(user_id) {
  return await prisma.despesa.findMany({
    where: {
      user_id: user_id,
      is_deleted: false,
    },
    orderBy: { data: "desc" },
  });
}

export async function getOneExpense(id, user_id) {
  return await prisma.despesa.findUnique({
    where: {
      id: id,
      user_id: user_id,
      is_deleted: false,
    },
  });
}
