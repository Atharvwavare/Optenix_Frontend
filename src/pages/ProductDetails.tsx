// src/pages/ProductDetails.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Star, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { fetchProducts, fetchProductById } from "../services/productApi";
import { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import CartPopup from "../others/CartPopup";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState<number>(1);
  const [showPopup, setShowPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showAllSpecs, setShowAllSpecs] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState("");

  /* ---------------- Load product ---------------- */
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.images?.[0] || data.image);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  /* ---------------- Load all products (search + suggestions) ---------------- */
  useEffect(() => {
    fetchProducts()
      .then(setAllProducts)
      .catch(console.error);
  }, []);

  /* ---------------- Debounce search ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery, allProducts]);

  if (loading) {
    return <div className="p-20 text-center text-xl">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="p-20 text-center text-2xl font-semibold">
        Product not found
      </div>
    );
  }

  /* ---------------- Price ---------------- */
  const basePrice = product.price * qty;
  const gst = Math.round(basePrice * 0.18);
  const finalPrice = basePrice + gst;

  /* ---------------- Cart ---------------- */
  const handleAddToCart = () => {
    const item = {
      id: product._id || product.id,
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
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: finalPrice,
      image: activeImage,
      quantity: qty,
    });

    if (!user) {
      navigate("/register", {
        state: { from: location.pathname },
      });
    } else {
      navigate("/place-order");
    }
  };

  /* ---------------- Suggestions ---------------- */
  const suggestions = allProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 6);

  const rating =
    typeof product.rating === "number"
      ? product.rating
      : parseFloat(product.rating as any) || 0;

  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-14 pr-6 py-4 rounded-full border"
          />
        </div>

        {/* Search Results */}
        {debouncedQuery && filteredProducts.length > 0 && (
          <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/shop/${p._id}`)}
                className="border rounded-xl p-3 cursor-pointer hover:shadow"
              >
                <img src={p.image} className="h-28 mx-auto" />
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <div className="text-blue-900 font-bold">₹{p.price}</div>
              </div>
            ))}
          </div>
        )}

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Images */}
          <div>
            <div className="border rounded-xl p-6 bg-gray-50 mb-4">
              <img src={activeImage} className="max-h-[420px] mx-auto" />
            </div>
            <div className="flex gap-3 justify-center">
              {(product.images?.length ? product.images : [product.image]).map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 border rounded cursor-pointer ${
                      activeImage === img ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                )
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

            <div className="flex gap-1 mb-4">
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

            <div className="border rounded-xl p-4 mb-5 bg-gray-50">
              <div className="flex justify-between">
                <span>Total Price:</span>
                <span className="font-bold">₹{finalPrice}</span>
              </div>
            </div>

            <p className="mb-6">{product.description}</p>

            <ul className="list-disc pl-5 mb-6">
              {(showAllSpecs
                ? product.specifications
                : product.specifications.slice(0, 6)
              ).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-4 py-3 rounded flex-1"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-4 py-3 rounded flex-1"
              >
                Buy Now
              </button>
            </div>

            <button onClick={() => navigate("/shop")} className="text-blue-600">
              ← Back to Shop
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <h2 className="text-2xl font-semibold mt-16 mb-6">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {suggestions.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/shop/${p._id}`)}
              className="border rounded-xl p-4 cursor-pointer hover:shadow"
            >
              <img src={p.image} className="h-28 mx-auto" />
              <h3 className="text-sm font-medium text-center">{p.name}</h3>
              <div className="text-blue-900 font-bold text-center">₹{p.price}</div>
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
