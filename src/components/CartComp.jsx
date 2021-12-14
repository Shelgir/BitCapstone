import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, removeAllFromCart } from "../features/CartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { usePurchaseOrderMutation } from "../services/service-api";
import jwt_decode from "jwt-decode";

export default function CartComp() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [purchaseOrder, { data, error }] = usePurchaseOrderMutation();
  const auth = jwt_decode(localStorage.getItem("authToken"));

  const sendCart = () => {
    const orderObj = {
      email: auth.email,
      total:
        Math.round(cart.reduce((a, { price }) => a + price, 0) * 100) / 100,
      products: cart,
    };
    console.log(orderObj);
    purchaseOrder(orderObj);
    dispatch(removeAllFromCart());
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {cart.length < 1 ? (
        <div className="flex justify-center flex-col items-center gap-5">
          <h2 className="text-2xl font-bold text-purple-400 text-center h-4 my-4">
            Add products to your cart
          </h2>
          <Link
            className="text-white bg-purple-400 rounded py-2 px-2 font-bold"
            to="/products"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="w-4/6 border-b-2 border-purple-400 py-2 flex justify-between items-center">
            <div className="flex">
              <div className="text-purple-400 font-bold text-2xl">Total</div>

              <div className="text-purple-400 font-bold px-4 text-2xl">
                $
                {Math.round(cart.reduce((a, { price }) => a + price, 0) * 100) /
                  100}
              </div>
            </div>
            <div className="flex  items-center">
              <button
                onClick={() => sendCart()}
                className="text-white bg-purple-400 rounded p-1 md:p-2 font-bold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col justify-center items-center">
        {cart.map((key, index) => (
          <div
            className="p-5 w-full flex flex-col justify-around items-center text-purple-700"
            key={index}
          >
            <div className=" rounded overflow-hidden w-4/6 bg-white grid grid-cols-2 ">
              <div className="px-4 py-2">
                <div className="font-bold text-2xl p-4">{key.name}</div>
              </div>
              <div className="px-4 py-3 mx-3 flex justify-end items-center">
                <div className="font-bold  p-4">${key.price}</div>
                <button
                  onClick={() => {
                    dispatch(removeFromCart(key._id));
                    console.log(cart);
                  }}
                  className="p-1 md:px-3 md:py-2 bg-red-500 rounded text-white hover:bg-red-700 transition-colors transform ease-in"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
