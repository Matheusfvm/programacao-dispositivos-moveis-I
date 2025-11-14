// src/routes/boletim.routes.ts
import { Router } from "express";
import { ReportController } from "../controllers/ReportController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

// Aluno logado vê apenas o próprio boletim
router.get("/me", requireRole("aluno"), ReportController.boletimDoAlunoLogado);

// Admin e professor veem boletim de uma disciplina específica
router.get(
  "/disciplina/:disciplinaId",
  requireRole("admin", "professor"),
  ReportController.boletimPorDisciplina
);

// Admin e professor atualizam notas/faltas de uma matrícula
router.patch(
  "/matricula/:matriculaId",
  requireRole("admin", "professor"),
  ReportController.atualizarNotas
);

export default router;
