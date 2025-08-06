import prisma from "../prismaClient.js";

export async function getAlertsByUserID(user_id) {
  return await prisma.alerts.findMany({
    where: {
      user_id: user_id,
    },
  });
}

export async function addAlerts(user_id, type, message) {
  return await prisma.alerts.create({
    date: {
      user_id: user_id,
      type: type,
      message: message,
    },
  });
}

export async function getAlertsNotRead(user_id) {
  return await prisma.alerts.findMany({
    where: {
      user_id: user_id,
      read: false,
    },
  });
}

export async function getAlertsByType(user_id, type) {
  return await prisma.alerts.findMany({
    where: {
      user_id: user_id,
      type: type,
    },
  });
}

export async function deleteAlerts(id, user_id) {
  const deleted = await prisma.alerts.deleteMany({
    where: {
      id: id,
      user_id: user_id,
    },
  });
  return deleted;
}

export async function alertRead(id, user_id) {
  return await prisma.alerts.update({
    where: {
      id: id,
      user_id: user_id,
    },
    data: {
      read: true,
    },
  });
}
