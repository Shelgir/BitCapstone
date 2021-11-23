import React from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../services/service-api";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/CartSlice";

export default function ProductsDetailsComps() {
  let { id } = useParams();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsByIdQuery(id);

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
    <div className="flex justify-center items-center my-4">
      <div className="w-4/5 flex items-center justify-between bg-white">
        <img
          className="w-full h-64 mx-3 object-cover object-center"
          src={data.image}
          alt=""
        ></img>

        <div className="px-6 py-4  grid grid-cols-1 gap-3">
          <div className="font-bold text-2xl mb-2 text-purple-700 text-center m-2 hover:text-purple-900 transition-colors transform ease-in">
            {data.name}
          </div>
          <div className=" text-xl font-bold text-purple-700 text-center m-2">
            ${data.price}
          </div>
          <div className=" text-base text-purple-700 text-center m-2">
            {data.description}
          </div>
          {cartProducts.includes(data._id) ? (
            <button
              onClick={() => {
                dispatch(removeFromCart(data._id));
              }}
              className="px-3 py-2 bg-red-500 rounded text-white hover:bg-red-700 transition-colors transform ease-in"
            >
              Remove from cart
            </button>
          ) : (
            <button
              onClick={() => {
                cartProducts.push(data._id);
                dispatch(addToCart(data));
              }}
              className="px-3 py-2 bg-purple-500 rounded text-white hover:bg-purple-700 transition-colors transform ease-in"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
