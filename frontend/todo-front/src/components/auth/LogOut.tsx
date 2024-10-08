import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export const LogOut = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };
  return <Button onClick={handleLogOut}>ログアウト</Button>;
};
