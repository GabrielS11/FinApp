import express from "express";
import {
  getUserById,
  deleteUser,
  updateUser,
} from "../repository/usersRepository.js";

export async function listUserDetailsService(user_id) {
  return await getUserById(user_id);
}

export async function deleteUserService(user_id) {
  return await deleteUser(user_id);
}

export async function updateUserService(user_id, name, email) {
  return await updateUser(user_id, name, email);
}
