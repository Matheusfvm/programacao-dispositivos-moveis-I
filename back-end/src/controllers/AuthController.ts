import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { gerarToken } from "../utils/jwt";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    const userRepo = AppDataSource.getRepository(User);

    const userExist = await userRepo.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUser = userRepo.create({
      nome,
      email,
      senha: senhaHash,
      tipo: tipo || "aluno",
    });

    await userRepo.save(novoUser);

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  }

  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    const token = gerarToken({ id: user.id, tipo: user.tipo });

    return res.json({
      message: "Login realizado com sucesso!",
      token,
      user: { id: user.id, nome: user.nome, tipo: user.tipo },
    });
  }
}
