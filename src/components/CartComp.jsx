import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/CartSlice";

export default function CartComp() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        {cart.map((key, index) => (
          <div className="p-10" key={index}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:scale-110 transition-all transform ease-in">
              <div className="px-6 py-4">
                <div className="font-bold text-2xl p-4">{key.name}</div>
              </div>
              <div className="px-6 py-4 pb-2">
                <button
                  onClick={() => {
                    dispatch(removeFromCart(key._id));
                    console.log(cart);
                  }}
                  className="px-3 py-2 bg-red-500 rounded text-white hover:bg-red-700 transition-colors transform ease-in"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
