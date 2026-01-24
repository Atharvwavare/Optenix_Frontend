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
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);

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

  if (!product) {
    return (
      <div className="p-20 text-center text-2xl font-semibold">
        Product not found
      </div>
    );
  }

  // -------------------- Image Gallery --------------------
  const images = product.images || [product.image];
  const [activeImage, setActiveImage] = useState(images[0]);

  // 🔥 Reset image when product changes (IMPORTANT for suggestions click)
  useEffect(() => {
    const imgs = product.images || [product.image];
    setActiveImage(imgs[0]);
    setQty(1); // reset quantity also
  }, [product]);

  // -------------------- GST Calculation --------------------
  const basePrice = product.price * qty;
  const gst = Math.round(basePrice * 0.18);
  const finalPrice = basePrice + gst;

  // -------------------- Add To Cart --------------------
  const handleAddToCart = () => {
    const item = {
      id: product.id,          // keep same type as Product id
      name: product.name,
      price: product.price,
      image: activeImage,
      quantity: qty,
    };

    addToCart(item);
    setLastAddedItem(item);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 3000);
  };

  // -------------------- Buy Now → Place Order Page --------------------
  const handleBuyNow = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: activeImage,
      quantity: qty,
    };

    // First add to cart (or temporary order state)
    addToCart(item);

    // 🔥 Navigate to Place Order page
    navigate("/place-order");
  };

  // -------------------- Suggested Products --------------------
  const suggestions = products.filter((p) => p.id !== id).slice(0, 4);

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
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* -------------------- Search Results -------------------- */}
        {debouncedQuery && filteredProducts.length > 0 && (
          <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/shop/${p.id}`)}
                className="border rounded-xl p-3 cursor-pointer hover:shadow-lg transition"
              >
                <img src={p.image} alt={p.name} className="h-28 mx-auto" />
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <div className="text-blue-900 font-bold">₹{p.price}</div>
              </div>
            ))}
          </div>
        )}

        {/* -------------------- Product Details -------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-12">

          {/* -------- Image Gallery -------- */}
          <div>
            <div className="border rounded-xl p-6 flex justify-center bg-gray-50 mb-4">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[420px] object-contain"
              />
            </div>

            <div className="flex gap-3 justify-center">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 object-contain border rounded cursor-pointer
                    ${activeImage === img ? "ring-2 ring-blue-500" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* -------- Product Info -------- */}
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
              <span className="ml-2 text-blue-600">
                {product.rating.toFixed(1)}
              </span>
            </div>

            {/* Price + GST */}
            <div className="border rounded-xl p-4 mb-5 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span>Base Price:</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>GST (18%):</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-800 border-t pt-2">
                <span>Total Price:</span>
                <span>₹{finalPrice}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                * Inclusive of 18% GST
              </p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* -------- Quantity -------- */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                  className="px-4 py-2 text-xl font-bold hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="px-4 py-2 text-xl font-bold hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* -------- Buttons -------- */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold rounded flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold rounded flex-1"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="text-blue-600 hover:underline"
            >
              ← Back to Shop
            </button>
          </div>
        </div>

        {/* -------------------- Suggested Products -------------------- */}
        <h2 className="text-2xl font-semibold mb-6">You might also like</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suggestions.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/shop/${p.id}`)}   // 🔥 Proper navigation
              className="border rounded-xl p-4 cursor-pointer hover:shadow-lg transition flex flex-col items-center bg-white"
            >
              <div className="w-full h-32 flex items-center justify-center bg-gray-50 rounded mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-28 object-contain"
                />
              </div>

              <h3 className="text-sm font-medium text-gray-900 text-center mb-1">
                {p.name}
              </h3>

              <div className="text-blue-900 font-bold">
                ₹{p.price}
              </div>
            </div>
          ))}
        </div>

        {/* -------------------- Cart Popup -------------------- */}
        {showPopup && lastAddedItem && (
          <CartPopup
            item={lastAddedItem}
            onClose={() => setShowPopup(false)}
          />
        )}

      </div>
    </section>
  );
}
