import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Class } from "../entities/Class";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // cria as tabelas automaticamente (apenas dev)
  logging: false,
  entities: [User, Class],
});