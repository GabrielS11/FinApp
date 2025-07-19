import prisma from "../prismaClient.js";

export async function getUserById(user_id) {
  const user = await prisma.users.findUnique({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  return user;
}

export async function deleteUser(user_id) {
  await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      is_deleted: true,
    },
  });
}

export async function updateUser(user_id, name, email) {
  const updatedUser = await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      name: name,
      email: email,
    },
    select: {
      email: true,
      name: true,
    },
  });
  return updatedUser;
}
