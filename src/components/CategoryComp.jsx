import React from "react";
import { useGetCategoriesQuery } from "../services/service-api";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function CategoryComp() {
  const { data = [], isLoading } = useGetCategoriesQuery();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="white" />
      </div>
    );
  return (
    <div className="grid grid-cols-3 py-10  m-auto w-3/4 gap-6">
      {data.map((categories) => {
        return (
          <div class="max-w-sm rounded  bg-white hover:scale-110 transition-all transform ease-in">
            <div class="px-6 py-4">
              <Link
                to={`/categories/${categories.name}`}
                class="font-bold text-sm mb-2 text-purple-700 text-center"
              >
                {categories.name}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
