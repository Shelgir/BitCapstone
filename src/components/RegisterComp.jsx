import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/service-api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function RegisterComp() {
  const [input, setInput] = useState({});
  let navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = (event) => {
    // toast.success("form submited");
    event.preventDefault();

    const userObj = {
      firstname: input.firstName,
      lastname: input.lastName,
      email: input.email,
      password: input.password,
      age: input.age,
    };

    registerUser(userObj)
      .unwrap()
      .then((data) => {
        if (data) {
          navigate("/login");

          // component
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          toast.error(error.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setInput("");
        }
      });

    setInput("");
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="text-purple-500 my-2 text-xl">
          Enter your first name:
        </label>
        <input
          type="text"
          name="firstName"
          value={input.firstName || ""}
          onChange={handleChange}
        />

        <label className="text-purple-500 my-2 text-xl">
          Enter your last name:
        </label>
        <input
          type="text"
          name="lastName"
          value={input.lastName || ""}
          onChange={handleChange}
        />

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
        <label className="text-purple-500 my-2 text-xl">Age:</label>
        <input
          type="number"
          name="age"
          value={input.age || ""}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-3 py-2 my-2 bg-purple-500 rounded text-white hover:bg-purple-700 transition-colors transform ease-in"
        >
          Register
        </button>
      </form>
    </div>
  );
}
