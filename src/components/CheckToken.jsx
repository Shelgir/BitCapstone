import React, { useEffect } from "react";
import { useLocation } from "react-router";
import jwt_decode from "jwt-decode";
import { logoutAuth } from "../features/UserAuthSlice";
import { useDispatch } from "react-redux";

export default function CheckToken() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      const userObj = jwt_decode(localStorage.getItem("authToken") || "");

      console.log(userObj);
      const date = new Date().getTime() / 1000;
      console.log(date);
      const { exp } = userObj;
      console.log(exp / 1000, "this is the expiry");

      if (date > exp) {
        dispatch(logoutAuth);
      }
    }
  }, [pathname]);
  return <div></div>;
}
