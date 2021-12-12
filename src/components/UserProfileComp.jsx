import React from "react";
import jwt_decode from "jwt-decode";
import { logoutAuth } from "../features/UserAuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function UserProfileComp() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let userObj;
  if (localStorage.getItem("authToken")) {
    const auth = jwt_decode(localStorage.getItem("authToken"));
    console.log(auth);
    userObj = {
      fname: auth.firstname,
      lname: auth.lastname,
      email: auth.email,
      role: auth.role,
    };
  } else {
    userObj = "";
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className=" bg-white w-3/4  grid grid-cols-2">
        <div className="p-6 text-3xl font-bold text-purple-700 border-r-2 border-purple-700">
          Welcome {userObj.fname}
        </div>
        <div className="flex flex-col justify-self-start p-6">
          <div className="text-purple-700">
            Last Name: <span className="font-bold">{userObj.lname}</span>
          </div>
          <div className="text-purple-700">
            Email: <span className="font-bold">{userObj.email}</span>
          </div>
          <div className="text-purple-700">
            Authority: <span className="font-bold">{userObj.role}</span>
          </div>
        </div>
      </div>
      <button
        className="my-2 mx-2 py-3 px-2 bg-purple-500 rounded text-white hover:bg-purple-700 transition-colors transform ease-in"
        onClick={() => {
          dispatch(logoutAuth());
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
