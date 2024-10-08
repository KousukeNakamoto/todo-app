import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={null} />
    </Routes>
  );
}

export default App;
