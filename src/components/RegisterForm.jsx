import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBackendApi } from "../services/ApiServices";
import { Exception } from "../utils/Exception";
import FormControl from "./FormControl";
import FormButton from "./FormButton";

import "./RegisterForm.css";

function RegisterForm() {
  // set state vars
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [user, setuser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setuser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      // const res = await fetch("http://localhost:5000/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: user.email, password: user.password }),
      // });

      // if (res.status != 200) throw new Error(res.statusText);

      // const { accessToken } = await res.json();
      const { accessToken = null } = await postBackendApi("register", {
        email: user.email,
        password: user.password,
      });

      localStorage.setItem("investmentsToken", accessToken);

      // clear form input and redirect to home
      setuser({ email: "", password: "" });
      setFetchErrorMsg(null);
      navigate("/", { replace: true });
    } catch (err) {
      const { message, statusCode } = err;

      setFetchErrorMsg("unable to register user");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="register-form-body">
      <div className="register-form access-div>">
        <h2>Create an Account</h2>
        <form onSubmit={onSubmit}>
          <FormControl
            inputOnChangeHandler={onChange}
            inputName="email"
            inputType="email"
            inputPlaceholder="Email"
            inputValue={user.email}
            inputRequired={true}
          />

          <FormControl
            inputOnChangeHandler={onChange}
            inputName="password"
            inputType="password"
            inputPlaceholder="Password"
            inputValue={user.password}
            inputRequired={true}
          />

          <FormButton btnText="Register" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
