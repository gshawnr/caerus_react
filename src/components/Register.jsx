import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fetchErrorMsg, setFetchErrorMsg] = useState(null);
  const [fetchErrorCode, setFetchErrorCode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_BE_BASEURL}/register`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ email: user.email, password: user.password }),
        }
      );

      if (response.status !== 200) {
        throw new Error(
          JSON.stringify({
            message: response.statusText,
            statusCode: response.status,
          })
        );
      }

      const { accessToken } = await response.json();
      localStorage.setItem("investmentsToken", accessToken);

      setUser({ email: "", password: "" });
      setFetchErrorMsg(null);
      setFetchErrorCode(null);
      navigate("/", { replace: true });
    } catch (err) {
      const { message = "unable to register user", statusCode = 500 } =
        JSON.parse(err.message);
      setFetchErrorMsg(message);
      setFetchErrorCode(statusCode);
    }
  };

  return (
    <div className="access-div">
      <form onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <br />
      {fetchErrorMsg && (
        <h3 style={{ color: "red", textAlign: "center" }}>
          Error registering user: {fetchErrorMsg}
        </h3>
      )}
    </div>
  );
};

export default Register;
