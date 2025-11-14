import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  id: number;
  tipo: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Pega o cabeçalho de autorização (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Adiciona os dados do usuário decodificados à requisição (para uso posterior)
    (req as any).user = {
      id: decoded.id,
      tipo: decoded.tipo,
    };

    // Continua para o próximo middleware/controlador
    next();
  } catch (error) {
    console.error("Erro na validação do token:", error);
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};

export const requireRole =
  (...roles: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      if (!roles.includes(user.tipo)) {
        return res
          .status(403)
          .json({ message: "Você não tem permissão para acessar esta rota" });
      }

      next();
    };
