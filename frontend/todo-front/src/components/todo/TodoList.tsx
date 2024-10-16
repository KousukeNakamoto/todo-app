import { Todo } from "../../../../../prisma/client/index";
import { Button } from "../ui/button";
import { TodoItem } from "./TodoItem";
import { useEffect, useState } from "react";
import { getTodoLoader } from "@/utils/dataloader/dataloader";
import { createTodo, getTodos } from "@/utils/todo/todo";
import { AnimatePresence, motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TodoList = () => {
  const [todos, setTodos] = useState<Pick<Todo, "id">[]>([]);
  const [filter, setFilter] = useState("all");
  const todoLoader = getTodoLoader();

  const getTodoIds = async () => {
    const data: Pick<Todo, "id">[] = await getTodos(filter);
    setTodos(data);
  };

  useEffect(() => {
    getTodoIds();
  }, [filter]);

  const handleCreateTodo = async () => {
    await createTodo();
    getTodoIds();
  };

  return (
    <div className="flex flex-col items-end space-y-4">
      <div className="flex items-end space-x-4">
        <Select onValueChange={setFilter}>
          <SelectTrigger className="font-medium text-sm mx-1">
            <SelectValue placeholder="フィルター" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全て</SelectItem>
            <SelectItem value="completed">完了済</SelectItem>
            <SelectItem value="unCompleted">未完了</SelectItem>
          </SelectContent>
        </Select>
        <Button variant={"outline"} onClick={handleCreateTodo}>
          タスク追加
        </Button>
      </div>
      <motion.ul className="space-y-4">
        <AnimatePresence mode="sync">
          {todos.map((todo: Pick<Todo, "id">) => (
            <TodoItem
              key={todo.id}
              todoId={todo.id}
              loader={todoLoader}
              getTodos={getTodoIds}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
};
