import React from "react";
import { useGetTypeCatQuery } from "../services/service-api";
import { BeatLoader } from "react-spinners";

export default function TypeCat() {
  const { data = [], isLoading } = useGetTypeCatQuery(
    "618d9800a08a29741852cec7"
  );
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="white" />
      </div>
    );
  return (
    <div className="grid grid-cols-3 py-10  m-auto w-3/4 gap-6">
      {data.map((type) => {
        return (
          <div class="max-w-sm rounded  bg-white hover:scale-110 transition-all transform ease-in">
            <div class="px-6 py-4">
              <div class="font-bold text-2xl mb-2 text-purple-700 text-center">
                {type.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
