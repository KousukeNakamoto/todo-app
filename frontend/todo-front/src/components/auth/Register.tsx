// Register.tsx
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./AuthForm";
import { authenticateUser } from "../../utils/auth/auth";
import { formData } from "@/types";

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData: formData) => {
    await authenticateUser("register", formData.email, formData.password);
    navigate("/"); // 登録成功後にダッシュボードへ遷移
  };

  return <AuthForm onSubmit={handleRegister} buttonText="登録" />;
};
