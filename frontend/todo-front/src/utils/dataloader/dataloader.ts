import DataLoader from "dataloader";
import { Todo } from "../../../../../prisma/client";

export const getTodoLoader = () =>
  new DataLoader((keys: readonly number[]) => batchGetTodo(keys));

const batchGetTodo = async (keys: readonly number[]) => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("JWT token not found");

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

    // HTTPエラーステータスを確認
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: Todo[] = await res.json();

    // keys の各 id に対応する Todo が見つからなかった場合は null を返す
    return keys.map((id) => data.find((todo: Todo) => todo.id === id)) ?? null;
  } catch (error) {
    console.error("Error loading todos:", error);
    // エラー時は null を返して、DataLoader に適切にエラー処理させる
    return keys.map(() => null);
  }
};
