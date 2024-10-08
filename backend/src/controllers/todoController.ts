import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { Todo } from "@prisma/client";
import DataLoader from "dataloader";

// express.Requestに拡張でuser型を追加
//https://zenn.dev/sc30gsw/articles/qiita-20230226-ef8afa2a0c5c4f288223
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      createdAt: Date;
    }
    interface Request {
      loaders: {
        todoLoader: DataLoader<number, Todo | null, number>;
      };
    }
  }
}

export const createTodo = async (req: Request, res: Response) => {
  const { title, detail, dueDate } = req.body;

  if (!req.user || typeof req.user.id !== "number") {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        detail,
        dueDate,
        userId: req.user?.id,
      },
    });
    console.log("🚀 ~ createTodo ~ todo:", todo);
    res.status(201).json({ todo: todo });
  } catch (error) {
    res.status(500).json({ error: "Todo creation failed" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id, title, detail, completed, dueDate } = req.body;

  if (!req.user || typeof req.user.id !== "number") {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id), userId: req.user.id }, // ユーザーIDを使って安全に更新
      data: {
        title,
        detail,
        completed,
        dueDate,
      },
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Todo update failed" });
  }
};

export const readTodo = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "number") {
    return res.status(401).json({ error: "Unauthorized user" });
  }
  console.log("todoController, params:", req.params.id);
  const ids = req.params.id
    .split("&")
    .map((part) => Number(part.split("=")[1]));
  try {
    // const todos = await req.loaders.todoLoader.load(parseInt(req.params.id));
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
        id: {
          in: ids,
        },
      }, // ユーザーIDを使って安全に更新
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Todo read failed" });
  }
};

export const readTodos = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "number") {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.id }, // ユーザーIDを使って安全に更新
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Todo read failed" });
  }
};

export const readTodoIds = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user.id !== "number") {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
      }, // ユーザーIDを使って安全に更新
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Todo read failed" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!req.user || typeof req.user.id !== "number") {
    return res.status(401).json({ error: "Unauthorized user" });
  }

  try {
    const deleteTodo = await prisma.todo.delete({
      where: { id: Number(id), userId: req.user.id },
    });

    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(500).json({ error: "Todo delete failed" });
  }
};
