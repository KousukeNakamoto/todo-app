import { Todo } from "@/types";
import { deleteTodo, updateTodos } from "@/utils/todo/todo";
import DataLoader from "dataloader";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";

type TodoItemType = {
  todoId: number;
  loader: DataLoader<number, Todo | undefined, number>;
  getTodos: () => Promise<void>;
};

export const TodoItem = ({ todoId, loader, getTodos }: TodoItemType) => {
  const [todo, setTodo] = useState<Todo>();
  const [trigger, setTrigger] = useState(false);
  const calender = useRef<HTMLInputElement | null>(null);

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
    <div className="border rounded-md p-4">
      <div className="flex space-x-4">
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

        <div
          className="flex items-center justify-end cursor-pointer w-24"
          onClick={() => calender.current?.showPicker()}
        >
          {todo.dueDate
            ? `残り${dayjs(todo.dueDate).diff(dayjs(), "day")}日`
            : "期限なし"}
        </div>

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
          ref={calender}
          className="w-0"
        />
        <button onClick={() => setTrigger(!trigger)}>aaa</button>
      </div>
      {trigger && (
        <div className="flex">
          <textarea className="w-full" />
          <button
            onClick={() => {
              deleteTodo(todo);
              getTodos();
            }}
          >
            del
          </button>
        </div>
      )}
    </div>
  );
};
