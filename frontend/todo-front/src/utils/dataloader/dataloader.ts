import { Todo } from "@/types";
import DataLoader from "dataloader";

export const getTodoLoader = () =>
  new DataLoader((keys: readonly number[]) => batchGetTodo(keys));

const batchGetTodo = async (keys: readonly number[]) => {
  const token = localStorage.getItem("jwt");
  if (!token) new Error();
  console.log(keys);

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/todo/${keys
      .map((key) => `id=${key}`)
      .join("&")}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const data: Todo[] = await res.json();
  return keys.map((id) => data.find((todo: Todo) => todo.id === id)) ?? null;
};
