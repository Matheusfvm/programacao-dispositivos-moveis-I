import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export class UserController {
  static async createAluno(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
      const repo = AppDataSource.getRepository(User);

      const existing = await repo.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: "E-mail já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const aluno = repo.create({
        nome,
        email,
        senha: senhaHash,
        tipo: "aluno",
      });

      await repo.save(aluno);

      return res.status(201).json({
        message: "Aluno cadastrado com sucesso.",
        aluno: { id: aluno.id, nome: aluno.nome, email: aluno.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar aluno." });
    }
  }

  static async createProfessor(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
      const repo = AppDataSource.getRepository(User);

      const existing = await repo.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: "E-mail já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const professor = repo.create({
        nome,
        email,
        senha: senhaHash,
        tipo: "professor",
      });

      await repo.save(professor);

      return res.status(201).json({
        message: "Professor cadastrado com sucesso.",
        professor: {
          id: professor.id,
          nome: professor.nome,
          email: professor.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao cadastrar professor." });
    }
  }

  static async list(req: Request, res: Response) {
    const { tipo } = req.query; // ?tipo=aluno ou ?tipo=professor

    try {
      const repo = AppDataSource.getRepository(User);
      const where = tipo ? { tipo: String(tipo) } : {};
      const users = await repo.find({ where });

      return res.json(
        users.map((u) => ({
          id: u.id,
          nome: u.nome,
          email: u.email,
          tipo: u.tipo,
        }))
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao listar usuários." });
    }
  }
}
