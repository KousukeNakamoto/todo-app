import { Todo } from "../../../../../prisma/client/index";
import { Button } from "../ui/button";
import { TodoItem } from "./TodoItem";
import { useEffect, useState } from "react";
import { getTodoLoader } from "@/utils/dataloader/dataloader";
import { createTodo, getTodos } from "@/utils/todo/todo";
import { Skeleton } from "../ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

export const TodoList = () => {
  const [todos, setTodos] = useState<Pick<Todo, "id">[]>([]);
  const todoLoader = getTodoLoader();

  const getTodoIds = async () => {
    const data: Pick<Todo, "id">[] = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    getTodoIds();
  }, []);

  const handleCreateTodo = async () => {
    await createTodo();
    getTodoIds();
  };
  return (
    <div className="flex flex-col items-end space-y-4">
      <Button variant={"outline"} onClick={handleCreateTodo}>
        タスク追加
      </Button>
      <motion.ul className="space-y-4">
        <AnimatePresence mode="sync">
          {/* {todos.length === 0 && <Skeleton className="h-[57.33px] w-[245px]" />} */}
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
