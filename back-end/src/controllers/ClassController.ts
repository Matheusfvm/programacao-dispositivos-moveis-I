import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Class } from "../entities/Class";
import { User } from "../entities/User";

export class ClassController {
  static async create(req: Request, res: Response) {
    const { nome, cargaHoraria } = req.body;

    if (!nome || !cargaHoraria) {
      return res
        .status(400)
        .json({ message: "Nome e Carga Horária são obrigatórios." });
    }

    try {
      const classRepo = AppDataSource.getRepository(Class);

      const classe = classRepo.create({
        nome,
        cargaHoraria,
        alunos: [],
      });

      await classRepo.save(classe);

      return res.status(201).json({
        message: "Disciplina criada com sucesso.",
        classe,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar disciplina." });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const classRepo = AppDataSource.getRepository(Class);
      const classes = await classRepo.find();
      return res.json(classes);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao listar disciplinas." });
    }
  }

  static async matricularAluno(req: Request, res: Response) {
    const { classId, alunoId } = req.body;

    try {
      const classRepo = AppDataSource.getRepository(Class);
      const userRepo = AppDataSource.getRepository(User);

      const classe = await classRepo.findOne({
        where: { id: classId },
        relations: ["alunos"],
      });

      if (!classe) {
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      const aluno = await userRepo.findOne({
        where: { id: alunoId, tipo: "aluno" },
      });

      if (!aluno) {
        return res.status(400).json({ message: "Aluno inválido." });
      }

      classe.alunos.push(aluno);
      await classRepo.save(classe);

      return res.json({
        message: "Aluno matriculado com sucesso.",
        classe,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao matricular aluno." });
    }
  }
}
