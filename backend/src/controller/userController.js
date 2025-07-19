import express from "express";
import {
  listUserDetailsService,
  deleteUserService,
  updateUserService,
} from "../service/usersService.js";
import { updateExpenseService } from "../service/expensesService.js";

export async function listUserDetailsController(req, res) {
  const user_id = req.user_id;

  const user = await listUserDetailsService(user_id);
  res.json(user);
}

export async function deleteUserController(req, res) {
  const user_id = req.user_id;

  await deleteUserService(user_id);
  res.json({ message: "User deleted successfully" });
}

export async function updateUserController(req, res) {
  const user_id = req.user_id;
  const { name, email } = req.body;

  const updatedUser = await updateUserService(user_id, name, email);
  res.json(updatedUser);
}
