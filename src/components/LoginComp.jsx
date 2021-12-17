import React, { useState } from "react";
import { useLoginUserMutation } from "../services/service-api";
import jwt_decode from "jwt-decode";
import { loginAuth } from "../features/UserAuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function LoginComp() {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userObj = {
      email: input.email,
      password: input.password,
    };

    loginUser(userObj)
      .unwrap()
      .then((data) => {
        console.log(JSON.stringify(data));
        localStorage.setItem("authToken", data);
        const userToken = jwt_decode(data);
        dispatch(loginAuth(userToken));
        if (data) {
          console.log("imhere");
          toast.success("Logged In Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        navigate("/");
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          toast.error(error.data, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setInput("");
        }
      });
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
    </div>
  );
}
