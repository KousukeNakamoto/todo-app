import { useState } from "react";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="container m-auto pt-16 h-screen flex flex-col items-center">
      <h1 className="p-8 text-4xl">
        {isLogin ? "Login Page" : "Register Page"}
      </h1>

      {isLogin ? <Login /> : <Register />}

      <button onClick={toggleForm} className="pt-4">
        {isLogin ? "新規登録はこちら" : "ログインはこちら"}
      </button>
    </div>
  );
};

export default LoginPage;
