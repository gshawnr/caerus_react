import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from "./FormControl";
import FormButton from "./FormButton";

import("./LoginForm.css");

const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    console.log("login called");
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_OFFLINE_BASEURL}/login`,
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
    <div className="login-form access-div">
      <h2>Log Into Your Account</h2>
      <form onSubmit={onSubmit}>
        <FormControl
          inputOnChangeHandler={onChange}
          inputName="email"
          inputType="email"
          inputPlaceholder="Email"
          inputValue={user.email}
          inputRequired
        />
        <FormControl
          inputName="password"
          inputType="password"
          inputPlaceholder="Password"
          inputValue={user.password}
          inputOnChangeHandler={onChange}
          inputRequired
        />
        <FormButton btnText="Sign In" type="submit" />
        <div className="register-link">
          <a href="/register">Create an account</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
