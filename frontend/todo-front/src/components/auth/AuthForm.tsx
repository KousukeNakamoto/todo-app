import React, { useState } from "react";
import { Button } from "../ui/button";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  buttonText: string;
}

export const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
  const [email, setEmail] = useState("sample@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSubmit(email, password); // 親コンポーネントに渡されたonSubmitを呼ぶ
    } catch (err) {
      setError("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div className="p-8 rounded-md shadow-md ">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-end"
      >
        <div>
          <div>
            <label>Email</label>
          </div>
          <input
            className="border rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <input
            className="border rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant={"login"}>
          {buttonText}
        </Button>
      </form>
    </div>
  );
};
