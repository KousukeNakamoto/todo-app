// Login.tsx
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./AuthForm";
import { authenticateUser } from "../../utils/auth/auth";
import { formData } from "@/types";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData: formData) => {
    await authenticateUser("login", formData.email, formData.password);
    navigate("/"); // ログイン成功後にダッシュボードへ遷移
  };

  return <AuthForm onSubmit={handleLogin} buttonText="ログイン" />;
};
