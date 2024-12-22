import axios from "axios";
import config from "@/lib/constant/config.ts";
import constant from "@/lib/constant/constant.ts";
import { BackendResponse } from "@/lib/model/response/backend/backend.response.ts";

const axiosInstance = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const tokenObj = localStorage.getItem(constant.TOKEN_KEY);
  if (tokenObj) {
    const token = JSON.parse(tokenObj);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      localStorage.removeItem(constant.TOKEN_KEY);
      localStorage.removeItem(constant.USER_KEY);
      window.location.href = "/auth";
    }

    return {
      message: error.response?.data.message || "An unknown error occurred",
      statusCode: error.response?.status || 500,
      error: error.response?.data.error || "Internal Server Error",
    };
  }

  return {
    message: "An unknown error occurred",
    statusCode: 500,
    error: "Internal Server Error",
  };
}

async function get<T>(url: string): BackendResponse<T> {
  try {
    const { data } = await axiosInstance.get<T>(url);

    return [data, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

async function post<T>(url: string, body: Object): BackendResponse<T> {
  try {
    const { data } = await axiosInstance.post<T>(url, body);

    return [data, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

async function put<T>(url: string): BackendResponse<T> {
  try {
    const { data } = await axiosInstance.put<T>(url);

    return [data, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

async function remove<T>(url: string): BackendResponse<T> {
  try {
    const { data } = await axiosInstance.delete<T>(url);

    return [data, null];
  } catch (error) {
    return [null, handleError(error)];
  }
}

const api = { get, post, put, remove };

export default api;
