import { Todo } from "@/types";
import { updateTodos } from "@/utils/todo/todo";
import DataLoader from "dataloader";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";

type TodoItemType = {
  todoId: number;
  loader: DataLoader<number, Todo | undefined, number>;
};

export const TodoItem = ({ todoId, loader }: TodoItemType) => {
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    (async () => {
      const data = await loader.load(todoId);
      console.log(dayjs(data?.dueDate).format("YYYY-MM-DDThh:mm"));

      setTodo(data);
    })();
  }, []);

  const handleTodoEdit = async (todo: Todo) => {
    await updateTodos(todo);
  };

  if (!todo?.id) return <Skeleton className="h-[57.33px] w-[245px]" />;
  return (
    <div className="flex space-x-4 border rounded-md p-4">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          setTodo({ ...todo, completed: e.target.checked });
          handleTodoEdit({ ...todo, completed: e.target.checked });
        }}
        className="cursor-pointer"
      />
      <input
        type="text"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        onBlur={() => {
          if (todo.title === "") return;
          handleTodoEdit(todo);
        }}
        className="px-1 outline-neutral-950 rounded-md"
        placeholder="タスクを追加"
      />
      {/* {todo.dueDate && <div>{todo.dueDate.toString()}</div>} */}
      <input
        type="datetime-local"
        onChange={(e) => {
          console.log(new Date(e.target.value).toISOString());
          setTodo({ ...todo, dueDate: new Date(e.target.value) });
          handleTodoEdit({ ...todo, dueDate: new Date(e.target.value) });
        }}
        value={
          todo.dueDate !== null
            ? dayjs(todo?.dueDate).format("YYYY-MM-DDThh:mm")
            : ""
        }
        min={dayjs(new Date()).format("YYYY-MM-DDThh:mm")}
      />
    </div>
  );
};
