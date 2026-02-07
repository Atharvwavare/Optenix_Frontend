import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Star, Search, Minus, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { fetchProducts, fetchProductById } from "../services/productApi";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import CartPopup from "../others/CartPopup";
import { useAuth } from "../context/AuthContext";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  /* ---------- LOAD PRODUCT ---------- */
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.images?.[0] || data.image || "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------- LOAD ALL PRODUCTS ---------- */
  useEffect(() => {
    fetchProducts().then(setAllProducts);
  }, []);

  /* ---------- SEARCH DEBOUNCE ---------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery, allProducts]);

  if (loading) {
    return <div className="py-20 text-center text-xl">Loading product…</div>;
  }

  if (!product) {
    return <div className="py-20 text-center text-2xl">Product not found</div>;
  }

  /* ---------- PRICE CALCULATION ---------- */
  const basePrice = product.price * qty;
  const gst = Math.round(basePrice * 0.18);
  const totalPrice = basePrice + gst;

  const rating =
    typeof product.rating === "number"
      ? product.rating
      : Number(product.rating) || 0;

  /* ---------- CART ---------- */
  const handleAddToCart = () => {
    const item: CartItem = {
      id: product._id,
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

  const handleBuyNow = () => {
    if (!user) {
      navigate("/register", { state: { from: location.pathname } });
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: activeImage,
      quantity: qty,
    });

    navigate("/place-order");
  };

  const suggestions = allProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 6);

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">

        {/* 🔍 SEARCH BAR */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* SEARCH RESULTS */}
        {debouncedQuery && filteredProducts.length > 0 && (
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/shop/${p._id}`)}
                className="border rounded-xl p-4 cursor-pointer hover:shadow"
              >
                <img src={p.image} className="h-28 mx-auto object-contain" />
                <h3 className="text-sm font-semibold mt-2">{p.name}</h3>
                <div className="font-bold text-blue-900">₹{p.price}</div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCT */}
        <div className="grid lg:grid-cols-2 gap-14">
          {/* IMAGES */}
          <div>
            <div className="border rounded-xl p-6 bg-gray-50 mb-4">
              <img src={activeImage} className="max-h-[420px] mx-auto object-contain" />
            </div>

            <div className="flex gap-3 justify-center">
              {(product.images?.length ? product.images : [product.image]).map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 border rounded cursor-pointer object-contain ${
                      activeImage === img ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                )
              )}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

            {/* ⭐ RATING */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(rating)
                      ? "fill-blue-500 text-blue-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-blue-600">{rating.toFixed(1)}</span>
            </div>

            {/* 💰 PRICE BREAKDOWN */}
            <div className="border rounded-xl p-4 bg-gray-50 mb-6 space-y-2">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            {/* 🔢 QUANTITY */}
            <div className="mb-6">
              <label className="font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="border p-2 rounded"
                >
                  <Minus />
                </button>
                <span className="px-6 py-2 border rounded font-semibold">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="border p-2 rounded"
                >
                  <Plus />
                </button>
              </div>
            </div>

            {/* 📄 DESCRIPTION */}
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="mb-6 text-gray-700">{product.description}</p>

            {/* 📌 SPECIFICATIONS */}
            <h3 className="text-xl font-semibold mb-2">Specifications</h3>
            <ul className="list-disc pl-5 mb-4">
              {(showAllSpecs
                ? product.specifications
                : product.specifications.slice(0, 6)
              ).map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>

            {product.specifications.length > 6 && (
              <button
                onClick={() => setShowAllSpecs((v) => !v)}
                className="text-blue-600 mb-6"
              >
                {showAllSpecs ? "Show Less" : "Show More"}
              </button>
            )}

            {/* 🛒 ACTIONS */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white py-3 rounded flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white py-3 rounded flex-1"
              >
                Buy Now
              </button>
            </div>

            <button onClick={() => navigate("/shop")} className="text-blue-600">
              ← Back to Shop
            </button>
          </div>
        </div>

        {/* 🔁 SUGGESTIONS */}
        <h2 className="text-2xl font-semibold mt-16 mb-6">
          You might also like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suggestions.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/shop/${p._id}`)}
              className="border rounded-xl p-4 cursor-pointer hover:shadow"
            >
              <img src={p.image} className="h-28 mx-auto object-contain" />
              <h3 className="text-sm font-medium text-center">{p.name}</h3>
              <div className="text-blue-900 font-bold text-center">
                ₹{p.price}
              </div>
            </div>
          ))}
        </div>

        {showPopup && lastAddedItem && (
          <CartPopup item={lastAddedItem} onClose={() => setShowPopup(false)} />
        )}
      </div>
    </section>
  );
}
