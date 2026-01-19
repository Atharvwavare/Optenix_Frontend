// src/pages/ProductDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useState } from "react";
import { products, Product } from "../data/ProductsData";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  // Find the product by ID
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product)
    return (
      <div className="p-20 text-center text-2xl font-semibold">
        Product not found
      </div>
    );

    
  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

        {/* Product Image */}
        <div className="border rounded-xl p-6 flex justify-center bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          {/* Name */}
          <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rating)
                    ? "fill-blue-500 text-blue-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-blue-600 ml-2">{product.rating.toFixed(1)}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-3">
            <span className="text-3xl font-bold text-blue-800">₹{product.price}</span>
            {product.originalPrice && (
              <span className="line-through text-black text-lg">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Discount */}
          {product.discount && (
            <p className="text-green-600 font-semibold mb-4">{product.discount}</p>
          )}

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-medium">Quantity:</span>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded px-3 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="bg-blue-600 hover:bg-blue-400 text-black px-8 py-3 font-semibold rounded transition">
              Add to Cart
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-semibold rounded transition">
              Buy Now
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/shop")}
            className="text-blue-600 hover:underline"
          >
            ← Back to Shop
          </button>
        </div>
      </div>
    </section>
  );
}
