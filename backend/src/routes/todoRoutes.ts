import express from "express";
import { authenticateJWT } from "../middlewares/auth";
import {
  createTodo,
  deleteTodo,
  readTodo,
  readTodoIds,
  updateTodo,
} from "../controllers/todoController";

const router = express.Router();

router.post("/todo", authenticateJWT, createTodo);
router.put("/todo", authenticateJWT, updateTodo);
router.get("/todos/:completed", authenticateJWT, readTodoIds);
router.get("/todo/:id", authenticateJWT, readTodo);
router.delete("/todo", authenticateJWT, deleteTodo);

export default router;
