// Login.tsx
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./AuthForm";
import { authenticateUser } from "../../utils/auth/auth";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await authenticateUser("login", email, password);
    navigate("/"); // ログイン成功後にダッシュボードへ遷移
  };

  return <AuthForm onSubmit={handleLogin} buttonText="ログイン" />;
};
