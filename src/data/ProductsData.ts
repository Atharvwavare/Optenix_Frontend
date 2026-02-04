// src/data/ProductsData.ts
import { Product } from "../types/Product";

import img1 from "../images/img1.webp";


/**
 * Base (read-only) products
 */
export const baseProducts: Product[] = [
  {
    id: "base-1",
    name: "Optenix Wireless Smart Device",
    image: img1,
    images: [img1],
    price: 30000,
    originalPrice: 35000,
    rating: 4.4,
    discount: "18% off",
    description: "Advanced wireless smart device for classrooms.",
    specifications: [
      "Wireless Connectivity",
      "AI Noise Cancellation",
      "Battery Life: 12 Hours",
      "Compatible with Android & Windows",
    ],
  },
];
