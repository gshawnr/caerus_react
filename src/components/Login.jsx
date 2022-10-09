import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [fetchRes, setRes] = useState(null);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_BE_BASEURL}/login`,
      {
        headers: {
          Authorization: "Bearer 1234Test",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
      }
    );

    const { accessToken } = await response.json();
    localStorage.setItem("investmentsToken", accessToken);

    setUser({ email: "", password: "" });
    navigate("/", { replace: true });
  };

  return (
    <div className="access-div">
      <form onSubmit={handleSubmit}>
        <h2>Log Into Your Account</h2>
        <input
          onChange={handleChange}
          name="email"
          required
          type="email"
          placeholder="Email"
          value={user.email}
        />
        <input
          onChange={handleChange}
          name="password"
          required
          type="password"
          placeholder="Password"
          value={user.password}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
