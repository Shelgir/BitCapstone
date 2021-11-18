import React from "react";
import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "../services/service-api";
import { BeatLoader } from "react-spinners";

export default function ProductsDetailsComps() {
  let { id } = useParams();
  const { data, isLoading } = useGetProductsByIdQuery(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="white" />
      </div>
    );
  return (
    <div>
      {" "}
      <div className="max-w-sm rounded  bg-white hover:scale-110 transition-all transform ease-in hover:bg-gray-200">
        <img
          className="w-full h-64 object-cover object-center"
          src={data.image}
          alt=""
        ></img>

        <div className="px-6 py-4  grid grid-cols-1 gap-3">
          <div className="font-bold text-xl mb-2 text-purple-700 text-center m-2 hover:text-purple-900 transition-colors transform ease-in">
            {data.name}
          </div>
          <div className=" text-base text-purple-700 text-center m-2">
            ${data.price}
          </div>
          <div className=" text-base text-purple-700 text-center m-2">
            {data.description}
          </div>
          <div className=" text-base text-purple-700 text-center m-2">
            {data.category}
          </div>
        </div>
      </div>
    </div>
  );
}
