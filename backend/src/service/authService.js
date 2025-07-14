import { createUser, getUserByEmail } from "../repository/authRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function registerService(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = await createUser(name, email, hashedPassword);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
}

export async function loginService(email, password) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not Found");
  }

  const passwordValid = bcrypt.compareSync(password, user.password);
  if (!passwordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
}
