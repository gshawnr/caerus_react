import React, { useState } from "react";
import { postApi } from "../services/ApiServices";

const Login = () => {
  const [fetchRes, setRes] = useState(null);

  const handleSubmit = async () => {
    const result = await postApi({
      headers: {
        Authorization: "Bearer 1234Test",
        "Content-Type": "application/json",
      },
      url: "http://localhost:5000/login",
      method: "POST",
      body: JSON.stringify({ email: "gsr3@email.com", password: "test123" }),
    });
  };
  return (
    <div className="access-div">
      <form>
        <h2>Log Into Your Account</h2>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="button" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
