    // src/pages/CartPage.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Shop
        </button>
      </div>
    );

  return (
    <section className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
            >
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Proceed to checkout")}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
