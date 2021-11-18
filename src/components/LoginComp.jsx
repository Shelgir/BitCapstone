import React, { useState } from "react";
import { useLoginUserMutation } from "../services/service-api";
import jwt_decode from "jwt-decode";
import { loginAuth, logoutAuth } from "../features/UserAuthSlice";
import { useDispatch } from "react-redux";

export default function LoginComp() {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();

  const [loginUser, { data, error }] = useLoginUserMutation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((oldState) => ({ ...oldState, [name]: value }));
  };

  if (data) {
    localStorage.setItem("authToken", data.token);
    const userToken = jwt_decode(data.token);
    dispatch(loginAuth(userToken));

    // component
  }
  if (error) {
    return <p className="text-white">{JSON.stringify(error)}</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const userObj = {
      email: input.email,
      password: input.password,
    };

    loginUser(userObj);
    setInput("");
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="text-purple-500 my-2 text-xl">
          Enter your email:
        </label>
        <input
          type="email"
          name="email"
          value={input.email || ""}
          onChange={handleChange}
        />

        <label className="text-purple-500 my-2 text-xl">
          Enter your password:
        </label>
        <input
          type="password"
          name="password"
          value={input.password || ""}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-3 py-2 my-2 bg-purple-500 rounded text-white hover:bg-purple-700 transition-colors transform ease-in"
        >
          Login
        </button>
      </form>

      <button className="text-white" onClick={() => dispatch(logoutAuth())}>
        Logout
      </button>
    </div>
  );
}
