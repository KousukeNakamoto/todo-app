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
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

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
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

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
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

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
): Promise<{ data?: Todo; error?: string }> => {
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

    if (!res.ok) {
      // レスポンスがエラーの時の処理
      const error = new Error(`HTTP error! Status: ${res.status}`);
      error.name = "HTTPError";
      throw error;
    }

    const data: Todo = await res.json();
    console.log("🚀 ~ updateTodos ~ data:", data);
    return { data };
  } catch (error) {
    console.log("🚀 ~ updateTodos ~ error:", error);
    if (error instanceof Error) {
      if (error.message === "JWT token not found") {
        console.error("JWT Token Error:", error.message);
        // ログインページに遷移するなどの処理
        return { error: error.message };
      } else if (error.name === "HTTPError") {
        console.error("HTTP Error:", error.message);
        // ステータスコードに応じた処理
        return { error: error.message };
      } else {
        console.error("Unknown error:", error.message);
        return { error: error.message };
      }
    }
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
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: Todo[] = await res.json();
    console.log("🚀 ~ updateTodo ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ updateTodo ~ error:", error);
    throw error;
  }
};
