import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { prisma } from "../utils/prisma";

// const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // 新規ユーザー作成
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    const token = generateToken(user.id);
    res.json({ token });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "ユーザーが見つかりません" });
    }

    // パスワードの検証
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "パスワードが違います" });
    }

    // JWTトークンを生成
    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
