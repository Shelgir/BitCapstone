import React from "react";
import jwt_decode from "jwt-decode";

export default function HeroSection() {
  let fname = "";
  if (localStorage.getItem("authToken")) {
    const auth = jwt_decode(localStorage.getItem("authToken"));
    fname = auth.firstname;
    console.log(fname);
  } else {
    fname = "!";
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-purple-400 text-6xl font-bold">Welcome {fname}</h2>
    </div>
  );
}
