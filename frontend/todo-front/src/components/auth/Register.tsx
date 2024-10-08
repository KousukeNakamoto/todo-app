// Register.tsx
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./AuthForm";
import { authenticateUser } from "../../utils/auth/auth";

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    await authenticateUser("register", email, password);
    navigate("/"); // 登録成功後にダッシュボードへ遷移
  };

  return <AuthForm onSubmit={handleRegister} buttonText="登録" />;
};
