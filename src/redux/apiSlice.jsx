import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //after creating this folder we import two function (createApi and fetchBaseQuery).

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/zgs/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Profile", "User", "Categories"],
  // refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({limit=10,offset=0}) => `/cat/category?limit=${limit}&offset=${offset}`,
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/cat/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    getProducts: builder.query({
      query: (id) => `/item/all?categoryId=${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/item/create",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
            draft.push(product);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/item/update/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/item/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (updatedPorfile) => ({
        url: "/user/update",
        method: "PUT",
        body: updatedPorfile,
      }),
      invalidatesTags: ["Profile"],
    }),
    getOrderDetailsCount: builder.query({
      query: () => "/order/orderNumber",
    }),
    getTotalOrder: builder.query({
      query: () => "/order/all",
    }),
    getUsers: builder.query({
      query: () => "/user/allUsers",
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    sendNotification : builder.mutation({
      query:(notification)=>({
        url:'/notification/send',
        method:'POST',
        body:notification
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetOrderDetailsCountQuery,
  useGetTotalOrderQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useSendNotificationMutation,
  useLoginMutation,
} = apiSlice;

//After impoting these function we create a slice with createApi function . this createApi function take the object in which we define reducerPath,Tags(like for which the apis are whether for Users,Products.) , baseQuery and endpoints . In the baseQuery we use fetchQueryBase function which also take the object in which we define baseUrl and prepareHeaders to taken the token for Authorization : Bearer token . Now the endpoints which takes arrow function and buidler as a parameter we define separate function for each request/endpoint , for get request we use builder.query and POST PUT DELETE we use builder.mutation and that function take query() as an object in which we define the remainng url/api and provideTags(just for GET request) and invalidatesTags for remaining requests
