import { Router } from "express";
import { ClassController } from "../controllers/ClassController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();

// Todas as rotas exigem estar logado
router.use(authMiddleware);

// Criar disciplina: admin ou professor
router.post(
  "/",
  requireRole("admin", "professor"),
  ClassController.create
);

// Listar disciplinas: qualquer usuário autenticado
router.get("/", ClassController.list);

// Matricular aluno: admin ou professor
router.post(
  "/matricular",
  requireRole("admin", "professor"),
  ClassController.matricularAluno
);

export default router;
