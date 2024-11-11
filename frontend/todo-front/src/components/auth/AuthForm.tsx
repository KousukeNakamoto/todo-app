import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { formData } from "@/types";

interface AuthFormProps {
  onSubmit: (formData: formData) => Promise<void>;
  buttonText: string;
}

export const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
  // const [email, setEmail] = useState("sample@gmail.com");
  // const [password, setPassword] = useState("123456789");
  // const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     await onSubmit(email, password); // 親コンポーネントに渡されたonSubmitを呼ぶ
  //   } catch (error) {
  //     console.log(error);

  //     setError("サーバーとの通信に失敗しました。");
  //   }
  // };

  return (
    <div className="p-8 rounded-md shadow-md ">
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-end"
      >
        <div>
          <div>
            <label>Email</label>
          </div>
          <input className="border rounded-md" {...register("email")} />
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <input className="border rounded-md" {...register("password")} />
        </div>
        <Button type="submit" variant={"login"}>
          {buttonText}
        </Button>
      </form>
    </div>
  );
};
