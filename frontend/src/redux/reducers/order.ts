import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../type/product";
import {
    createOrderAsync,
    getAllOrderAsync,
  deletelOrderAsync,
} from "../actions/order";

interface ProductState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  products: Product[];
}

const initialState: ProductState = {
  loading: "idle",
  error: null,
  products: [],
};

const productSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
        // const updatedProductList = state.products;
        // updatedProductList.unshift(action.payload);
        // state.products = updatedProductList;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(getAllOrderAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getAllOrderAsync.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
        //state.products = action.payload.products;
      })
      .addCase(getAllOrderAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      })
      .addCase(deletelOrderAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deletelOrderAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deletelOrderAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "An error occurred";
        throw action.error;
      });
  },
});

export default productSlice;
