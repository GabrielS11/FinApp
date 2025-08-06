import express from "express";
import { getAllAlertsController } from "../controller/alertsController.js";

const router = express.Router();

router.get("/get-all", getAllAlertsController);

export default router;
