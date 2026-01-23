// src/pages/ProductDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Star, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { products, Product } from "../data/ProductsData";
import { useCart } from "../context/CartContext";

import CartPopup from "../others/CartPopup";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const [showPopup, setShowPopup] = useState(false);


  // -------------------- Search --------------------
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedQuery),
    );
  }, [debouncedQuery]);

  // -------------------- Find Product --------------------
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product)
    return (
      <div className="p-20 text-center text-2xl font-semibold">
        Product not found
      </div>
    );

  // -------------------- Suggested Products --------------------
  const suggestions = products.filter((p) => p.id !== id); // exclude current product

  // -------------------- Handlers --------------------
  const handleAddToCart = () => {
  addToCart({
    id: Number(product.id),
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: qty,
  });

  setShowPopup(true);

  setTimeout(() => {
    setShowPopup(false);
  },3000);
};



  const handleBuyNow = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
    navigate("/buy-now");
  };

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        {/* -------------------- Search Bar -------------------- */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search products..."
            className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-lg shadow-sm"
            aria-label="Search products"
          />
        </div>

        {/* -------------------- Search Results -------------------- */}
        {debouncedQuery && filteredProducts.length > 0 && (
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/shop/${p.id}`)}
                className="bg-white rounded-xl border shadow-sm p-3 cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-28 object-contain mx-auto mb-2"
                />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {p.name}
                </h3>
                <div className="text-blue-900 font-bold">₹{p.price}</div>
              </div>
            ))}
          </div>
        )}

        {/* -------------------- Product Details -------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-10">
          {/* Main Product Image */}
          <div className="border rounded-xl p-6 flex justify-center bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] object-contain"
            />
          </div>

          {/* Product Info */}
          <div>
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
              <span className="text-blue-600 ml-2">
                {product.rating.toFixed(1)}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl font-bold text-blue-800">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="line-through text-black text-lg">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {product.discount && (
              <p className="text-green-600 font-semibold mb-4">
                {product.discount}
              </p>
            )}

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
  <span className="font-medium">Quantity:</span>

  <div className="flex items-center border rounded-lg overflow-hidden">
    {/* Minus Button */}
    <button
      onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
      className="px-4 py-2 text-xl font-bold text-gray-700 hover:bg-gray-100"
    >
      −
    </button>

    {/* Quantity Display */}
    <span className="px-6 py-2 text-lg font-semibold select-none">
      {qty}
    </span>

    {/* Plus Button */}
    <button
      onClick={() => setQty((prev) => prev + 1)}
      className="px-4 py-2 text-xl font-bold text-gray-700 hover:bg-gray-100"
    >
      +
    </button>
  </div>
</div>


            {/* Buttons */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold rounded transition flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold rounded transition flex-1"
              >
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

        {/* -------------------- Suggested Product Images -------------------- */}
        <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {suggestions.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/shop/${p.id}`)}
              className="cursor-pointer border rounded-xl p-3 hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-34 object-contain mb-2"
              />
              <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
              <div className="text-blue-900 font-bold">₹{p.price}</div>
            </div>
          ))}
        </div>
        {showPopup && <CartPopup onClose={() => setShowPopup(false)} />}

      </div>
    </section>
  );
}
