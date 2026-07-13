import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCategoryWiseExpense = (days) =>
  api.get(`/transactions/category-wise?days=${days}`);

export const getIncomeExpense = (days) =>
  api.get(`/transactions/income-expense?days=${days}`);

export const getTotalTransactions = (days) =>
  api.get(`/transactions/total?days=${days}`);

export const getDayWise = (days) =>
  api.get(`/transactions/day-wise?days=${days}`);


export default api;
