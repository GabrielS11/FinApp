import {
  getAllCategoryExpensesService,
  getThisMonthsCategoryExpensesService,
  getSpecificCategoryExpensesService,
} from "../service/categoryExpensesService.js";

export async function getAllCategoryExpensesController(req, res) {
  try {
    const user_id = req.user_id;
    const allCategoryExpenses = await getAllCategoryExpensesService(user_id);

    if (!allCategoryExpenses) {
      return res.status(404).json({ message: "No category expenses found" });
    }

    return res.json(allCategoryExpenses);
  } catch (err) {
    console.error("❌ Erro no controller:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getThisMonthsCategoryExpensesController(req, res) {
  const user_id = req.user_id;
  const { month, year } = req.body;

  const thisMonthCategoryExpenses = await getThisMonthsCategoryExpensesService(
    user_id,
    month,
    year
  );

  if (!thisMonthCategoryExpenses) {
    return res.json({
      message: "No category Expenses available in this month",
    });
  }

  return res.json(thisMonthCategoryExpenses);
}

export async function getSpecificCategoryExpensesController(req, res) {
  const user_id = req.user_id;
  const { category, month, year } = req.body;

  const specificCategoryExpense = await getSpecificCategoryExpensesService(
    user_id,
    category,
    month,
    year
  );

  if (!specificCategoryExpense) {
    return res.json({
      message: "Couldn't find the expense to that specific category",
    });
  }

  return res.json(specificCategoryExpense);
}
