import { Todo } from "../../../../../prisma/client/index";
import { deleteTodo, updateTodos } from "@/utils/todo/todo";
import DataLoader from "dataloader";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { IoReload } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

type TodoItemType = {
  todoId: number;
  loader: DataLoader<number, Todo | null | undefined, number>;
  getTodos: () => Promise<void>;
};

export const TodoItem = ({ todoId, loader, getTodos }: TodoItemType) => {
  const [todo, setTodo] = useState<Todo>();
  const [error, setError] = useState<string>();
  const [trigger, setTrigger] = useState(false);
  const calender = useRef<HTMLInputElement | null>(null);
  let prevTitle: string = "";

  useEffect(() => {
    (async () => {
      const data = await loader.load(todoId);
      if (data) {
        setError(undefined);
        setTodo(data);
        prevTitle = data.title;
        console.log(dayjs(data?.dueDate).format("YYYY-MM-DDThh:mm"));
      }
    })();
  }, []);

  const handleTodoEdit = async (todo: Todo) => {
    setError(undefined);

    const { error } = await updateTodos(todo);

    if (error) {
      setError(error);
    }
  };

  if (!todo?.id) return <Skeleton />;
  return (
    <motion.div
      className="border rounded-md p-4"
      layout
      whileHover={{
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", // Tailwindのshadow-md相当
      }}
      initial={{ opacity: 0, z: -200 }}
      animate={{ opacity: 1, z: 0 }}
      exit={{ scale: 1, opacity: 0, z: -200 }}
      transition={{ stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="flex space-x-4"
        layout
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
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
            if (todo.title === "" || prevTitle === todo.title) return;
            handleTodoEdit(todo);
          }}
          className={`px-1 outline-neutral-950 rounded-md ${
            todo.completed && "line-through"
          }`}
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
            setTodo({
              ...todo,
              dueDate: new Date(e.target.value),
            });
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
        <motion.button
          onClick={() => setTrigger(!trigger)}
          animate={{ rotate: trigger ? -90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineKeyboardArrowLeft size={24} />
        </motion.button>
      </motion.div>
      {error && (
        <div className="flex space-x-2 mt-2 items-center">
          <p className=" text-red-600 text-xs">
            データベースに同期されていません
          </p>
          <IoReload
            onClick={() => handleTodoEdit(todo)}
            size={12}
            className="hover:scale-110 duration-300"
          />
        </div>
      )}

      <AnimatePresence>
        {trigger && (
          <motion.div
            className="flex"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <textarea
              className="w-full h-[100px] mt-4 p-2 resize-none"
              value={todo.detail ? todo.detail : ""}
              placeholder="詳細を入力"
              onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
              onBlur={() => {
                if (todo.detail === "") return;
                handleTodoEdit(todo);
              }}
            />
            <motion.button
              onClick={() => {
                deleteTodo(todo);
                getTodos();
              }}
              // className="hover:text-red-500 duration-100"
            >
              <MdDeleteForever size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
