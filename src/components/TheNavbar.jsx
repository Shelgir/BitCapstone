import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/service-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function TheNavbar() {
  const location = useLocation();
  const cart = useSelector((state) => state.cart.value);
  const { data = [] } = useGetCategoriesQuery();
  const [showMenu, setShowMenu] = useState(false);

  const { pathname } = location;
  const splitLocation = pathname.split("/");
  let menu;
  if (showMenu) {
    menu = (
      <div className="flex flex-col justify-center items-center">
        <Link
          to="/cart"
          className="mx-4 w-full py-2 text-purple-600 bg-white text-center text-xl hover:bg-purple-200"
        >
          Cart [ {cart.length} ]
        </Link>
        {localStorage.getItem("authToken") ? (
          <Link
            to="/profile"
            className="mx-4 w-full py-2 text-purple-600 bg-white text-center text-xl hover:bg-purple-200"
          >
            Profile
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="mx-4 w-full py-2 text-purple-600 bg-white text-center text-xl hover:bg-purple-200"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="mx-4 w-full py-2 text-purple-600 bg-white text-center text-xl hover:bg-purple-200"
            >
              Login
            </Link>
          </>
        )}
      </div>
    );
  }
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
                      <div>
                        <Link
                          to={`/categories/${categories.name}`}
                          className="font-bold text-sm mb-2 text-purple-700 text-center px-6 py-3"
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
          <button onClick={() => setShowMenu(!showMenu)} className="mx-3">
            {showMenu ? (
              <FontAwesomeIcon
                icon={faTimes}
                className="text-purple-600 hover:text-purple-900 transition-colors transform ease-in md:hidden"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="text-purple-600 hover:text-purple-900 transition-colors transform ease-in md:hidden"
              />
            )}
          </button>
          <div className="hidden md:block ">
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
            {localStorage.getItem("authToken") ? (
              <Link
                to="/profile"
                className={
                  splitLocation[1] === "profile"
                    ? "mx-4 text-xl font-bold text-purple-500 border-b-2 border-purple-500 "
                    : "mx-4 text-xl font-bold text-purple-500 hover:text-purple-700 transition-colors ease-in "
                }
              >
                Profile
              </Link>
            ) : (
              <>
                {" "}
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
              </>
            )}
          </div>
        </div>{" "}
        {menu}
      </>
    </div>
  );
}
