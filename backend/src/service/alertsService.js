import {
  getAlertsByUserID,
  addAlerts,
  deleteAlerts,
  alertRead,
} from "../repository/alertsRepository.js";

export async function getAllAlertsService(user_id) {
  return await getAlertsByUserID(user_id);
}

export async function addAlertsService(user_id, type, message) {
  const optimizedType = type.toLowerCase();

  const addedAlert = await addAlerts(user_id, optimizedType, message);

  if (!addedAlert) {
    throw new Error("Error adding alert");
  }

  return addedAlert;
}

export async function deleteAlertsService(id, user_id) {
  const deletedAlert = await deleteAlerts(id, user_id);

  if (deletedAlert.count < 0) {
    throw new Error("Couldnt find specified alert");
  }
  return;
}

export async function alertReadService(id, user_id) {
  return await alertRead(id, user_id);
}
