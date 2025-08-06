import { getAllAlertsService } from "../service/alertsService.js";

export async function getAllAlertsController(req, res) {
  const user_id = req.user_id;

  try {
    const alerts = await getAllAlertsService(user_id);
    if (!alerts) {
      return res.json({
        message:
          "Couldnt find any alerts, maybe add some budget limits or Recurring Expenses",
      });
    }
    return res.json(alerts);
  } catch (error) {
    console.log(`File: alertsController:
        Error: ${error}
        `);
  }
}
