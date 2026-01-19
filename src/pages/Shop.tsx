// src/pages/Shop.tsx
import { useEffect, useMemo, useState } from "react";
import { Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/ProductsData";

export default function Shop() {
  const navigate = useNavigate();

  /* -------------------- State -------------------- */
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  /* -------------------- Debounce (FAST) -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  /* -------------------- Filter Logic -------------------- */
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(debouncedQuery)
    );
  }, [debouncedQuery]);

  /* -------------------- UI -------------------- */
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-6">

        {/* -------------------- Heading -------------------- */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Optenix{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              World
            </span>
          </h1>
          <p className="text-gray-700 text-xl max-w-2xl mx-auto">
            Explore our smart hardware and digital solutions designed for
            education and enterprises.
          </p>
        </motion.div>

        {/* -------------------- Search -------------------- */}
        <div className="max-w-xl mx-auto mb-16 relative">
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

        {/* -------------------- Results -------------------- */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No products match your search.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/shop/${product.id}`)}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-xl
                           p-4 flex flex-col transition cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
              >
                {/* Image */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 object-contain"
                  />
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "fill-blue-400 text-blue-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-blue-900 ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-blue-900 mb-4">
                  ₹{product.price}
                  {product.originalPrice && (
                    <span className="text-base font-normal text-gray-400 line-through ml-2">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent double navigation
                    navigate(`/shop/${product.id}`);
                  }}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white
                             font-semibold py-2 rounded-full transition"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
