import img1 from "../images/img1.webp";
import optenix_4k_AI_ptz from "../images/optenix_4k_ptz_camera.jpeg";


export type Product = {
  id: string;
  name: string;
  image:string;
  images: string[];        // 🔥 multiple images
  price: number;
  originalPrice?: number;          // base price (without GST)
  rating: number;
  discount?: string;
  description: string;
  specifications: string[];   // 🔥 product specs
};


export const products: Product[] = [
  {
  id: "1",
  name: "Optenix Wireless Smart Device",
  image: img1,
  images: [img1],
  price: 4999,
  originalPrice: 7000 ,
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

{
  id: "2",
  name: "Optenix 4k AI PTZ Camera",
  image: optenix_4k_AI_ptz,
  images: [optenix_4k_AI_ptz],
  price: 2999,
  originalPrice: 6000 ,
  rating: 4.3,
  discount: "18% off",
  description: "Advanced wireless smart device for classrooms.",
  specifications: [
    "Wireless Connectivity",
    "AI Noise Cancellation",
    "Battery Life: 12 Hours",
    "Compatible with Android & Windows",
  ],
},
]