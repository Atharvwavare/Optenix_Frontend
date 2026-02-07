// src/types/Product.ts
// fixed
export interface Product {
  _id: string;
  name: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  discount?: string;
  description: string;
  specifications: string[];
}

// 🔥 FORM TYPE (no _id)
export type ProductForm = Omit<Product, "_id">;
