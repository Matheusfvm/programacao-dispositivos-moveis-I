import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import classRoutes from "./routes/class.routes";
import reportRoutes from "./routes/report.routes";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/boletim", reportRoutes);

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco de dados PostgreSQL!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("Erro ao conectar no banco:", err));