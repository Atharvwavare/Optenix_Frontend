import axios from "axios";
import { Product } from "../types/Product";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export const fetchProducts = async () => {
  const res = await axios.get<Product[]>(API_URL);
  return res.data;
};

export const fetchProductById = async (id: string) => {
  const res = await axios.get<Product>(`${API_URL}/${id}`);
  return res.data;
};
