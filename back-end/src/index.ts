import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco de dados PostgreSQL!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("Erro ao conectar no banco:", err));