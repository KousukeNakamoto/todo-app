import { Todo } from "@/types";
import { Button } from "../ui/button";
import { TodoItem } from "./TodoItem";
import { useEffect, useState } from "react";
import { getTodoLoader } from "@/utils/dataloader/dataloader";
import { createTodo, getTodos } from "@/utils/todo/todo";
import { Skeleton } from "../ui/skeleton";

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
      <ul className="space-y-4">
        {todos.length === 0 && <Skeleton className="h-[57.33px] w-[245px]" />}
        {todos.map((todo: Pick<Todo, "id">) => (
          <TodoItem
            key={todo.id}
            todoId={todo.id}
            loader={todoLoader}
            getTodos={getTodoIds}
          />
        ))}
      </ul>
    </div>
  );
};
