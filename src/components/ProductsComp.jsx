import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../services/service-api";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/CartSlice";
import { useParams } from "react-router";

export default function ProductsComp() {
  const { data = [], isLoading } = useGetProductsQuery();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  let { here } = useParams;

  console.log(here);
  const newData = [];
  data.forEach((p) => {
    if (p.category === "shoes") {
      newData.push(p);
    }
  });
  console.log(newData);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="white" />
      </div>
    );
  return (
    <div className="grid grid-cols-4 py-10  m-auto w-3/4 gap-10">
      {/* you can use JSON.stringify() to check returned objects, bcuz js doesn't allow you to check objects directly */}
      {data.map((products, index) => {
        return (
          <div
            key={index}
            className="max-w-sm rounded  bg-white hover:scale-110 transition-all transform ease-in hover:bg-gray-200"
          >
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
              <div className=" text-base text-purple-700 text-center m-2">
                ${products.price}
              </div>
              {!cart.includes(products) ? (
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
        );
      })}
    </div>
  );
}