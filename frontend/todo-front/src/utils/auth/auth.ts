// APIリクエストを送る関数を共通化
export const authenticateUser = async (
  endpoint: string,
  email: string,
  password: string
) => {
  const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // メールとパスワードを送信
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "認証に失敗しました");
  }

  // JWTトークンをローカルストレージに保存
  localStorage.setItem("jwt", data.token);
  console.log("🚀 ~ data:", data.token);

  return data;
};
