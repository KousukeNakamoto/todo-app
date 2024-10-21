import { Todo } from "../../../../../prisma/client/index";
import { deleteTodo, updateTodos } from "@/utils/todo/todo";
import DataLoader from "dataloader";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { IoReload } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { CalendarInput } from "./utils/CalendarInput";

type TodoItemType = {
  todoId: number;
  loader: DataLoader<number, Todo | null | undefined, number>;
  getTodos: () => Promise<void>;
};

export const TodoItem = ({ todoId, loader, getTodos }: TodoItemType) => {
  const [todo, setTodo] = useState<Todo>();
  const [error, setError] = useState<string>();
  const [trigger, setTrigger] = useState(false);
  const prevTitle = todo?.title;
  const prevDetail = todo?.detail;

  useEffect(() => {
    (async () => {
      const data = await loader.load(todoId);
      if (data) {
        setError(undefined);
        setTodo(data);
        console.log(dayjs(data?.dueDate).format("YYYY-MM-DDThh:mm"));
      }
    })();
  }, [loader, todoId]);

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
      className="border rounded-md p-3"
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
          className={`px-1 outline-neutral-950 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
            todo.completed && "line-through"
          }`}
          placeholder="タスクを追加"
        />
        <CalendarInput
          setTodo={setTodo}
          todo={todo}
          handleTodoEdit={handleTodoEdit}
        />
        <motion.button
          onClick={() => setTrigger(!trigger)}
          animate={{ rotate: trigger ? -90 : 0 }}
          transition={{ duration: 0.3 }}
          className="hover:bg-accent hover:text-accent-foreground transition-colors rounded-md w-8 flex justify-center items-center"
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
            className="flex flex-col items-end space-y-2"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <motion.textarea
              className="w-full h-[100px] mt-4 p-2 resize-none hover:bg-accent hover:text-accent-foreground transition-colors rounded-md overflow-hidden"
              value={todo.detail ? todo.detail : ""}
              placeholder="詳細を入力"
              onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
              onBlur={() => {
                if (todo.detail === "" || todo.detail === prevDetail) return;
                handleTodoEdit(todo);
              }}
            />
            <motion.button
              exit={{ opacity: 0, height: 0 }}
              onClick={() => {
                deleteTodo(todo);
                getTodos();
              }}
              className="hover:text-red-500 hover:text-accent-foreground transition-colors"
            >
              <MdDeleteForever size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
