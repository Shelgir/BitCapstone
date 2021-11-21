import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/service-api";

export default function TheNavbar() {
  const location = useLocation();
  const cart = useSelector((state) => state.cart.value);
  const { data = [] } = useGetCategoriesQuery();

  const { pathname } = location;
  const splitLocation = pathname.split("/");
  return (
    <div>
      <>
        <div className="w-full flex justify-between relative px-3 py-5 shadow-sm">
          <div>
            <Link
              to="/"
              className={
                splitLocation[1] === ""
                  ? "mx-4 text-xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Home
            </Link>
            <div
              className={`dropdown ${
                splitLocation[1] === "products"
                  ? "mx-4 text-xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }`}
            >
              <Link className="dropbtn" to="/products">
                Products
              </Link>
              <div className="dropdown-content rounded">
                {data.map((categories, index) => {
                  return (
                    <div
                      key={index}
                      className="max-w-sm bg-white hover:bg-purple-300 transition-colors transform ease-in"
                    >
                      <div className="px-6 py-2">
                        <Link
                          to={`/categories/${categories.name}`}
                          className="font-bold text-sm mb-2 text-purple-700 text-center"
                        >
                          {categories.name}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <Link
              to="/cart"
              className={
                splitLocation[1] === "cart"
                  ? "mx-4 text-xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Cart [ {cart.length} ]
            </Link>
            <Link
              to="/register"
              className={
                splitLocation[1] === "register"
                  ? "mx-4 text-xl font-bold text-purple-500 border-b-2 border-purple-500 "
                  : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
              }
            >
              Register
            </Link>
            <Link
              to="/login"
              className={
                splitLocation[1] === "login"
                  ? "mx-4 text-xl font-bold text-purple-500 border-b-2 border-purple-500 "
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
