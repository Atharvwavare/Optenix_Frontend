import img1 from "../images/img1.webp";
import product2 from "../images/img2.jpg";
import product3 from "../images/img2.jpg";
import product4 from "../images/img2.jpg";
import product5 from "../images/img2.jpg";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  discount?: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Optenix Wireless Smart Device",
    image: img1,
    price: 2999,
    originalPrice: 3999,
    rating: 4.3,
    discount: "25% off",
    description:
      "Advanced wireless smart device designed for modern classrooms and enterprises.",
  },
  {
    id: "2",
    name: "Optenix Pro Headphones",
    image: product2,
    price: 5499,
    originalPrice: 7999,
    rating: 4.5,
    discount: "31% off | Noise Cancelling",
    description:
      "Crystal-clear sound with deep bass and active noise cancellation.",
  },
  {
    id: "3",
    name: "Optenix Smart Camera",
    image: product3,
    price: 3999,
    originalPrice: 5499,
    rating: 4.1,
    discount: "27% off",
    description:
      "AI-powered smart camera for classrooms and conference rooms.",
  },
  {
    id: "4",
    name: "Optenix Smart Camera",
    image: product4,
    price: 3999,
    originalPrice: 5499,
    rating: 4.1,
    discount: "27% off",
    description:
      "AI-powered smart camera for classrooms and conference rooms.",
  },
  {
    id: "5",
    name: "Optenix Smart Camera",
    image: product5,
    price: 3999,
    originalPrice: 5499,
    rating: 4.1,
    discount: "27% off",
    description:
      "AI-powered smart camera for classrooms and conference rooms.",
  },
];
