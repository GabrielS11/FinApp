import express from "express";
import { getAllMonthlyExpensesController } from "../controller/monthlyExpensesController.js";

const router = express.Router();

router.get("/all", getAllMonthlyExpensesController);
