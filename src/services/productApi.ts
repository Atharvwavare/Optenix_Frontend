import axios from "axios";
import { Product } from "../types/Product";

const API_URL = import.meta.env.VITE_API_URL + "/api/products";

// Public shop
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Single product
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
