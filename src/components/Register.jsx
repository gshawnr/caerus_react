import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { postApi } from "../services/ApiServices";

const Register = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fetchRes, setRes] = useState(null);
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const result = await postApi({
      headers: {
        Authorization: "Bearer 1234Test",
        "Content-Type": "application/json",
      },
      url: "http://localhost:5000/register",
      method: "POST",
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
    setRes(result);
  };

  return (
    <div className="access-div">
      <form>
        <h2>Create an Account</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
