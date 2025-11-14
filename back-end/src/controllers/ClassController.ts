import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Class } from "../entities/Class";
import { User } from "../entities/User";
import { Enrollment } from "../entities/Enrollment";

export class ClassController {
  static async create(req: Request, res: Response) {
    const { nome, cargaHoraria, professorId } = req.body;

    if (!nome || !cargaHoraria || !professorId) {
      return res
        .status(400)
        .json({ message: "Nome, Carga Horária e o Id do professor são obrigatórios." });
    }

    try {
      const classRepo = AppDataSource.getRepository(Class);
      const userRepo = AppDataSource.getRepository(User);

      let professor: User | null = null;

      if (professorId) {
        professor = await userRepo.findOne({
          where: { id: Number(professorId), tipo: "professor" },
        });

        if (!professor) {
          return res
            .status(400)
            .json({ message: "Professor inválido ou não encontrado." });
        }
      }

      const classe = classRepo.create({
        nome,
        cargaHoraria,
        professor: professor || null,
        matriculas: [],
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
      const matriculaRepo = AppDataSource.getRepository(Enrollment);

      const classe = await classRepo.findOne({ where: { id: Number(classId) } });
      if (!classe) {
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      const aluno = await userRepo.findOne({
        where: { id: Number(alunoId), tipo: "aluno" },
      });

      if (!aluno) {
        return res.status(400).json({ message: "Aluno inválido." });
      }

      // Evitar matrícula duplicada
      const jaExiste = await matriculaRepo.findOne({
        where: {
          aluno: { id: aluno.id },
          disciplina: { id: classe.id },
        } as any,
      });

      if (jaExiste) {
        return res
          .status(400)
          .json({ message: "Aluno já está matriculado nesta disciplina." });
      }

      const matricula = matriculaRepo.create({
        aluno,
        disciplina: classe,
        p1: null,
        p2: null,
        p3: null,
        mediaFinal: null,
        faltas: 0,
      });

      await matriculaRepo.save(matricula);

      return res.status(201).json({
        message: "Aluno matriculado com sucesso.",
        matricula,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao matricular aluno na disciplina." });
    }
  }

  static async atualizarProfessor(req: Request, res: Response) {
    const { id } = req.params;
    const { professorId } = req.body;

    if (!professorId) {
      return res
        .status(400)
        .json({ message: "Informe o ID do professor." });
    }

    try {
      const classRepo = AppDataSource.getRepository(Class);
      const userRepo = AppDataSource.getRepository(User);

      const classe = await classRepo.findOne({ where: { id: Number(id) } });
      if (!classe) {
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      const professor = await userRepo.findOne({
        where: { id: Number(professorId), tipo: "professor" },
      });

      if (!professor) {
        return res.status(400).json({ message: "Professor inválido." });
      }

      classe.professor = professor;
      await classRepo.save(classe);

      return res.json({
        message: "Professor vinculado à disciplina com sucesso.",
        classe,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar professor da disciplina." });
    }
  }
}
