import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBackendApi } from "../services/ApiServices";
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
    e.preventDefault();

    try {
      const { accessToken = null } = await postBackendApi("login", {
        email: user.email,
        password: user.password,
      });

      localStorage.setItem("investmentsToken", accessToken);

      setUser({ email: "", password: "" });
      navigate("/", { replace: true });
    } catch (err) {
      const { message, statusCode = 500 } = err;
      // TODO set error modal

      localStorage.setItem("investmentsToken", null);
    }
  };

  return (
    <div className="login-form-body">
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
    </div>
  );
};

export default LoginForm;
