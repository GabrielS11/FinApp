import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Conected to the database successfully!");
  } catch (error) {
    console.log("❌ Error connecting to the database", error);
  }
})();

export default prisma;
