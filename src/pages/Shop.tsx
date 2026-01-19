// src/pages/Shop.tsx
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/ProductsData";
import { motion } from "framer-motion";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Optenix{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              World
            </span>
          </h1>
          <p className="text-black text-2xl max-w-2xl mx-auto">
            Explore our smart hardware and digital solutions designed for
            education and enterprises.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-xl p-4 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
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

              {/* Button */}
              <button
                onClick={() => navigate(`/shop/${product.id}`)}
                className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
