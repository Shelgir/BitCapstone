import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TheNavbar() {
  const location = useLocation();
  const cart = useSelector((state) => state.cart.value);

  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <div>
      <>
        <div className="w-full flex justify-around relative px-3 py-5 shadow-sm">
          <div className=" justify-end">
            <Link
              to="/"
              className={
                splitLocation[1] === ""
                  ? "mx-4 text-2xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Home
            </Link>
            <Link
              to="/products"
              className={
                splitLocation[1] === "products"
                  ? "mx-4 text-2xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Products
            </Link>
            <Link
              to="/categories"
              className={
                splitLocation[1] === "categories"
                  ? "mx-4 text-2xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Categories
            </Link>
            <Link
              to="/cart"
              className={
                splitLocation[1] === "cart"
                  ? "mx-4 text-2xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Cart [ {cart.length} ]
            </Link>
            <Link
              to="/register"
              className={
                splitLocation[1] === "register"
                  ? "mx-4 text-2xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Register
            </Link>
            <Link
              to="/login"
              className={
                splitLocation[1] === "login"
                  ? "mx-4 text-2xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Login
            </Link>
          </div>
        </div>
      </>
    </div>
  );
}
