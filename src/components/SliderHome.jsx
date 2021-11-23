import React from "react";
import { Link } from "react-router-dom";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useGetProductsQuery } from "../services/service-api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/CartSlice";
import { BeatLoader } from "react-spinners";

export default function SliderHome() {
  const { data = [], isLoading } = useGetProductsQuery();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  let newData = [];
  newData = data.filter((p) => p.category === "shoes");

  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(localCart);

  const cartProducts = [];
  cart.forEach((cartItem) => {
    cartProducts.push(cartItem._id);
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="white" />
      </div>
    );

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="font-bold text-purple-400 text-2xl my-6">
        Best Selling Shoes
      </h2>
      <Splide>
        {newData.map((products, index) => {
          return (
            <SplideSlide
              key={index}
              className="flex justify-center items-center"
            >
              <div className="w-2/3 bg-white grid grid-cols-2">
                <img
                  className="w-full h-64 object-cover object-center"
                  src={products.image}
                  alt=""
                ></img>

                <div className="px-6 py-4  grid grid-cols-1 gap-3">
                  <Link
                    to={`/products/${products._id}`}
                    className="font-bold text-xl mb-2 text-purple-700 text-center m-2 hover:text-purple-900 transition-colors transform ease-in"
                  >
                    {products.name}
                  </Link>
                  <div className=" text-lg font-bold text-purple-700 text-center m-2">
                    ${products.price}
                  </div>
                  {!cartProducts.includes(products._id) ? (
                    <button
                      onClick={() => {
                        dispatch(addToCart(products));
                      }}
                      className="px-3 py-2 bg-purple-500 rounded text-white hover:bg-purple-700 transition-colors transform ease-in"
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(products._id));
                      }}
                      className="px-3 py-2 bg-red-500 rounded text-white hover:bg-red-700 transition-colors transform ease-in"
                    >
                      Remove from cart
                    </button>
                  )}
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}
