import { Todo } from "../../../../../prisma/client/index";

export const getTodos = async (filter: string): Promise<Pick<Todo, "id">[]> => {
  const token = localStorage.getItem("jwt");
  console.log(import.meta.env.VITE_API_URL);

  if (!token) {
    throw new Error("JWT token not found");
  }
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/todos/completed=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data: Pick<Todo, "id" | "completed">[] = await res.json();
    console.log("🚀 ~ getTodos ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ getTodos ~ error:", error);
    throw error;
  }
};
export const getTodo = async (id: number): Promise<Todo> => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("JWT token not found");
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data: Todo = await res.json();
    console.log("🚀 ~ getTodo ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ getTodo ~ error:", error);
    throw error;
  }
};

export const createTodo = async (): Promise<Todo> => {
  const token = localStorage.getItem("jwt");
  console.log(import.meta.env.VITE_API_URL);

  if (!token) {
    throw new Error("JWT token not found");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "", detail: "", dueDate: null }),
    });

    const data: Todo = await res.json();
    console.log("🚀 ~ createTodo ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ createTodo ~ error:", error);
    throw error;
  }
};

export const updateTodos = async (
  todo: Pick<Todo, "title" | "detail" | "dueDate" | "completed">
): Promise<Todo> => {
  const token = localStorage.getItem("jwt");
  console.log(import.meta.env.VITE_API_URL);

  if (!token) {
    throw new Error("JWT token not found");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const data: Todo = await res.json();
    console.log("🚀 ~ updateTodos ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ updateTodos ~ error:", error);
    throw error;
  }
};

export const deleteTodo = async (id: Pick<Todo, "id">): Promise<Todo[]> => {
  const token = localStorage.getItem("jwt");
  console.log(import.meta.env.VITE_API_URL);

  if (!token) {
    throw new Error("JWT token not found");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/todo`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    const data: Todo[] = await res.json();
    console.log("🚀 ~ updateTodo ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ updateTodo ~ error:", error);
    throw error;
  }
};
