import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// カスタムフックでサーバーとの認証確認
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/validate-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          // 認証失敗時はログインページにリダイレクト
          navigate("/login");
        } else {
          // 認証成功
          setIsAuthenticated(true);
        }
      } catch (error) {
        // 通信エラーなどで認証できない場合
        console.log(error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, token]);

  return isAuthenticated; // 認証済みかどうかを返す
};
