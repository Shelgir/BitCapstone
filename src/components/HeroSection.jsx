import React from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import HeroImg from "../images/HeroSectionImg.png";

export default function HeroSection() {
  let fname = "";
  if (localStorage.getItem("authToken")) {
    const auth = jwt_decode(localStorage.getItem("authToken"));
    fname = auth.firstname;
    console.log(fname);
  }
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="lg:col-span-1 col-span-3 flex justify-center items-center">
        {fname ? (
          <h2 className="text-purple-400 text-6xl font-bold">
            Welcome {fname}
          </h2>
        ) : (
          <>
            <h2 className="text-purple-400 mx-2 text-6xl font-bold">Welcome</h2>
            <Link
              to="/register"
              className="pt-3 px-2 mx-2 text-purple-400 text-3xl flex items-end justify-end font-bold hover:text-purple-700 transition-all transform ease-in"
            >
              Register Here
            </Link>
          </>
        )}
      </div>
      <div className="hidden lg:block"></div>
      <div className="lg:flex justify-center items-center hidden">
        <img className="" src={HeroImg} alt="" />
      </div>
    </div>
  );
}
