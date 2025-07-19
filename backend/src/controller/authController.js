import express from "express";
import { loginService, registerService } from "../service/authService.js";

export async function registeController(req, res) {
  const { name, email, password } = req.body;
  try {
    const token = await registerService(name, email, password);
    res.json({ token: token });
  } catch (error) {
    res.status(503).json({ message: "Registration failed" });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    const token = await loginService(email, password);
    res.json({ token: token });
  } catch (err) {
    if (err.message === "User not Found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "Invalid password") {
      return res.status(401).json({ message: err.message });
    }
    return res.status(503).json({ message: "Internal error" });
  }
}
