// src/controllers/BoletimController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Enrollment } from "../entities/Enrollment";
import { Class } from "../entities/Class";

export class ReportController {
  // Aluno logado vê apenas o boletim dele
  static async boletimDoAlunoLogado(req: Request, res: Response) {
    const { id, tipo } = (req as any).user;

    if (tipo !== "aluno") {
      return res
        .status(403)
        .json({ message: "Apenas alunos podem acessar este recurso." });
    }

    try {
      const repo = AppDataSource.getRepository(Enrollment);
      const matriculas = await repo.find({
        where: { aluno: { id } } as any,
      });

      const resultado = matriculas.map((m) => ({
        disciplinaId: m.disciplina.id,
        disciplina: m.disciplina.nome,
        professor: m.disciplina.professor?.nome || null,
        p1: m.p1,
        p2: m.p2,
        p3: m.p3,
        mediaFinal: m.mediaFinal,
        faltas: m.faltas,
      }));

      return res.json(resultado);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao consultar boletim do aluno." });
    }
  }

  // Admin ou Professor visualizam boletim de uma disciplina
  static async boletimPorDisciplina(req: Request, res: Response) {
    const { id: userId, tipo } = (req as any).user;
    const { disciplinaId } = req.params;

    try {
      const classRepo = AppDataSource.getRepository(Class);
      const disciplina = await classRepo.findOne({
        where: { id: Number(disciplinaId) },
      });

      if (!disciplina) {
        return res.status(404).json({ message: "Disciplina não encontrada." });
      }

      // Se for professor, só pode ver se for titular desta disciplina
      if (tipo === "professor" && disciplina.professor?.id !== userId) {
        return res
          .status(403)
          .json({
            message:
              "Você não tem permissão para ver o boletim desta disciplina.",
          });
      }

      const matriculaRepo = AppDataSource.getRepository(Enrollment);
      const matriculas = await matriculaRepo.find({
        where: { disciplina: { id: disciplina.id } } as any,
      });

      const resultado = matriculas.map((m) => ({
        matriculaId: m.id,
        alunoId: m.aluno.id,
        alunoNome: m.aluno.nome,
        p1: m.p1,
        p2: m.p2,
        p3: m.p3,
        mediaFinal: m.mediaFinal,
        faltas: m.faltas,
      }));

      return res.json({
        disciplinaId: disciplina.id,
        disciplina: disciplina.nome,
        professor: disciplina.professor?.nome || null,
        alunos: resultado,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao consultar boletim da disciplina." });
    }
  }

  // Admin ou Professor atualizam notas/faltas de uma matrícula
  static async atualizarNotas(req: Request, res: Response) {
    const { id: userId, tipo } = (req as any).user;
    const { matriculaId } = req.params;
    const { p1, p2, p3, mediaFinal, faltas } = req.body;

    try {
      const repo = AppDataSource.getRepository(Enrollment);
      const matricula = await repo.findOne({
        where: { id: Number(matriculaId) },
      });

      if (!matricula) {
        return res.status(404).json({ message: "Matrícula não encontrada." });
      }

      // Se professor: só altera se for titular da disciplina desta matrícula
      if (tipo === "professor") {
        if (matricula.disciplina.professor?.id !== userId) {
          return res
            .status(403)
            .json({
              message:
                "Você não tem permissão para alterar notas desta disciplina.",
            });
        }
      }

      // Aluno nunca altera (rota já protegida para admin/professor nas rotas)
      if (p1 !== undefined) matricula.p1 = p1;
      if (p2 !== undefined) matricula.p2 = p2;
      if (p3 !== undefined) matricula.p3 = p3;
      if (mediaFinal !== undefined) matricula.mediaFinal = mediaFinal;
      if (faltas !== undefined) matricula.faltas = faltas;

      await repo.save(matricula);

      return res.json({
        message: "Notas/Faltas atualizadas com sucesso.",
        matricula,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar notas/faltas." });
    }
  }
}
