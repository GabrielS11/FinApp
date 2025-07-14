import prisma from "../prismaClient.js";

export async function createUser(name, email, password) {
  const user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return user;
}

export async function getUserByEmail(email) {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
