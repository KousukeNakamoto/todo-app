import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { formData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

interface AuthFormProps {
  onSubmit: (formData: formData) => Promise<void>;
  buttonText: string;
}

const schema = z.object({
  email: z.string().email("正しいメールアドレスを入力してください"),
  password: z.string().min(3),
});

type FormValue = z.infer<typeof schema>;

export const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValue>({ resolver: zodResolver(schema), mode: "onBlur" });

  const errorHandle = async ({ email, password }: FormValue) => {
    try {
      setError(false);
      await onSubmit({ email, password }); // 親コンポーネントに渡されたonSubmitを呼ぶ
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="p-8 rounded-md shadow-md ">
      <form
        onSubmit={handleSubmit(errorHandle)}
        className="space-y-4 flex flex-col items-end"
      >
        <div>
          <div>
            <label>Email</label>
          </div>
          <input className="border rounded-md" {...register("email")} />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div>
            <label>Password</label>
          </div>
          <input className="border rounded-md" {...register("password")} />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" variant={"login"} disabled={isLoading}>
          {buttonText}
        </Button>
        {error && <p className="text-red-600">error</p>}
      </form>
    </div>
  );
};
