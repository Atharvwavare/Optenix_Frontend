// src/pages/CartPage.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Update quantity using + / - buttons
  const updateQuantity = (id: string, newQty: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || newQty < 1) return;

    // Add the difference (positive or negative)
    addToCart({ ...item, quantity: newQty - item.quantity });
  };

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Shop
        </button>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain rounded-lg bg-gray-50 p-2"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(6)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-blue-400 text-blue-400"
                      />
                    ))}
                  </div>

                  <div className="mt-2 flex items-center gap-6">
                    <span className="text-blue-900 font-bold text-lg">
                      ₹{item.price}
                    </span>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3">
                      <span className="font-medium">Qty:</span>

                      <div className="flex items-center border rounded-lg overflow-hidden">
                        {/* Minus */}
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-xl font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                          disabled={item.quantity === 1}
                        >
                          −
                        </button>

                        {/* Quantity Display */}
                        <span className="px-5 py-1 text-lg font-semibold select-none">
                          {item.quantity}
                        </span>

                        {/* Plus */}
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-xl font-bold text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-semibold mb-6">Summary</h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span className="text-gray-900 font-bold text-lg">
                ₹{total}
              </span>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded mb-3 transition"
            >
              Buy Now
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 font-semibold rounded transition"
            >
              Clear Cart
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="w-full mt-4 text-blue-600 hover:underline"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
