import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("authToken") || [];
export const productsApiSlice = createApi({
  // when we attach this to our redux store, where are we keeping the data in the reducers
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://serene-eyrie-59879.herokuapp.com/",
    // if the endpoint requires auth, you need to add header with your API key
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", token);
        console.log("headers", token);
      }
      return headers;
    },
  }),
  // try to define the expected endpoints upfront as part of the structure
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: () => "/products",
      }),
      getCategories: builder.query({
        query: () => "/categories",
      }),
      getProductsById: builder.query({
        query: (id) => `/products/${id}`,
      }),
      registerUser: builder.mutation({
        query: (userObj) => ({
          url: "/register",
          method: "POST",
          body: userObj,
        }),
      }),
      purchaseOrder: builder.mutation({
        query: (cartObj) => ({
          url: "/orders",
          method: "POST",
          body: cartObj,
        }),
      }),
      loginUser: builder.mutation({
        query: (userObj) => ({
          url: "/login",
          method: "POST",
          body: userObj,
        }),
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByIdQuery,
  usePurchaseOrderMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = productsApiSlice;
