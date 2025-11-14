import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";

const router = Router();

// Todas as rotas abaixo exigem usuário logado
router.use(authMiddleware);

// Rotas só para ADMIN (cadastrar e listar usuários)
router.post(
  "/alunos",
  requireRole("admin"),
  UserController.createAluno
);

router.post(
  "/professores",
  requireRole("admin"),
  UserController.createProfessor
);

router.get(
  "/",
  requireRole("admin"),
  UserController.list
);

export default router;
