import "./App.css";
import Home from "./Home";
import Investments from "./Investments";
// import Login from "./components/Login";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
