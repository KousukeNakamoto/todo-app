import { TodoList } from "@/components/todo/TodoList";
import { useAuthCheck } from "../hooks/auth";

const Home = () => {
  const isAuthenticated = useAuthCheck();

  if (!isAuthenticated) return <div>Loading...</div>;
  return (
    <div className="container m-auto pt-8 h-screen flex flex-col items-center space-y-4">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
};

export default Home;
