import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import prisma from "./prismaClient.js";
import expensesRoutes from "./routes/expensesRoutes.js";
import authMiddleware from "./middleWare/authMiddleware.js";
import monthlyExpensesRoutes from "./routes/monthlyExpensesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryExpenseRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors()); //<-- Lets the APIRest received request from anyone
app.use(express.json());

//Setting the routes to use - Auth// expenses// budget// alerts// investments
app.use("/auth", authRoutes);
app.use("/expenses", authMiddleware, expensesRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/monthly-expenses", authMiddleware, monthlyExpensesRoutes);
app.use("/category-expenses", authMiddleware, categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}`);
});
