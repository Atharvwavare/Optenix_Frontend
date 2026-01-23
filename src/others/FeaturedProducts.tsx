import { useState, useRef } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { products } from "../data/FeaturedProducts";   // my featured products data file

export default function FeaturedProducts() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleSpecs = (index: number) => {
    setExpandedIndex((prev) => {
      const newIndex = prev === index ? null : index;

      // Auto scroll when opening
      if (newIndex !== null) {
        setTimeout(() => {
          cardRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 250);
      }

      return newIndex;
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">

        {/* Title Animation (kept) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Choose the perfect solution for your business needs.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                ref={(el) => (cardRefs.current[index] = el)}
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
                style={{ minHeight: "500px" }}
              >
                {/* Product Image (NO animation now) */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {product.name}
                  </h3>

                  {/* Specifications (NO framer animation, only height toggle + scroll) */}
                  <div className="mb-6 text-black flex flex-col flex-grow">
                    <ul
                      className={`space-y-3 flex-grow transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-72 overflow-auto"
                          : "max-h-40 overflow-hidden"
                      }`}
                    >
                      {product.specifications.map((spec, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2"
                        >
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More Button (no animation) */}
                    <button
                      onClick={() => toggleSpecs(index)}
                      className="mt-2 text-blue-600 font-semibold hover:underline self-start"
                    >
                      {isExpanded ? "Show Less" : "Learn More"}
                    </button>
                  </div>

                  {/* Shop Now Button (simple hover only via CSS) */}
                  <div className="mt-auto">
                    <Link
                      to="/shop"
                      className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow text-center"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
