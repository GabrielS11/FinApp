import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import prisma from "./prismaClient.js";
import expensesRoutes from "./routes/expensesRoutes.js";
import authMiddleware from "./middleWare/authMiddleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors()); //<-- Lets the APIRest received request from anyone
app.use(express.json());

//Setting the routes to use
app.use("/auth", authRoutes);
app.use("/expenses", authMiddleware, expensesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`);
});
