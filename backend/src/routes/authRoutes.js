import express, { json } from "express";
import {
  loginController,
  registeController,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", registeController);

// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 8);

//   try {
//     const user = await prisma.users.create({
//       data: {
//         name: name,
//         password: hashedPassword,
//         email: email,
//       },
//     });

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });
//     res.json({ token });
//   } catch (error) {
//     res.sendStatus(503);
//   }
// });

router.post("/login", loginController);

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await prisma.users.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const passwordValid = bcrypt.compareSync(password, user.password);
//     if (!passwordValid) {
//       return res.status(401), json({ message: "Password is wrong" });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });
//     res.json({ token });
//   } catch (error) {
//     return res.sendStatus(503);
//   }
// });

export default router;
