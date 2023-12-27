import { createAsyncThunk } from "@reduxjs/toolkit";
import lwpAxios from "../../config/axiosConfig";
import { AxiosError } from "axios";

export interface Order {
    card:string;
    shippingAddress:string;
    userId:number;
    totalPrice:number;
    status:string;
    paymentInfo:string;
    paidAt:number;
    deliveredAt:number;
    createdAt:number;
  }

export const createOrderAsync = createAsyncThunk(
  "order/create",
  async (order: Order) => {
    try {
      const response = await lwpAxios.post("/order/", order, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          "Create Order failed: " + error.response?.data.message
        );
      } else {
        return Promise.reject();
      }
    }
  }
);

export const getAllOrderAsync = createAsyncThunk(
  "order/getOrder",
  async () => {
    try {
      const response = await lwpAxios.get("/order/", {
        withCredentials: true,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          "Fetch All Order failed: " + error.response?.data.message
        );
      } else {
        return Promise.reject();
      }
    }
  }
);

export const deletelOrderAsync = createAsyncThunk(
  "order/cancel",
  async (id: string) => {
    try {
      await lwpAxios.delete(`/order/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          "Cancel Order failed: " + error.response?.data.message
        );
      } else {
        return Promise.reject();
      }
    }
  }
);
