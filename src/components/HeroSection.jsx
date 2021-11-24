import React from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

export default function HeroSection() {
  let fname = "";
  if (localStorage.getItem("authToken")) {
    const auth = jwt_decode(localStorage.getItem("authToken"));
    fname = auth.firstname;
    console.log(fname);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      {fname ? (
        <h2 className="text-purple-400 text-6xl font-bold">Welcome {fname}</h2>
      ) : (
        <>
          <h2 className="text-purple-400 mx-2 text-6xl font-bold">Welcome</h2>
          <Link
            to="/register"
            className="py-3 px-2 mx-2 text-purple-400 text-6xl font-bold hover:text-purple-700 transition-all transform ease-in"
          >
            Register Here
          </Link>
        </>
      )}
    </div>
  );
}
