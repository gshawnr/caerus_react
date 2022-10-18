import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Investments from "./components/Investments";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
