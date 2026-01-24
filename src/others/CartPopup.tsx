// src/components/CartPopup.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
}

export default function CartPopup({ onClose, item }: Props) {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!item) return null;

  return (
    <div className="fixed top-24 right-6 w-72 bg-white shadow-2xl border rounded-xl p-4 z-50 animate-slide-in">
      <h3 className="font-semibold mb-3 text-green-600">
        ✅ Added to Cart
      </h3>

      <div className="flex gap-3 mb-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-contain border rounded"
        />

        <div className="flex-1">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-600">
            Qty: {item.quantity}
          </p>
          <p className="font-bold text-blue-700">
            ₹{item.price}
          </p>
        </div>
      </div>

      <p className="text-sm mb-3">
        Total items in cart:{" "}
        <span className="font-semibold">{totalQty}</span>
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          View Cart
        </button>

        <button
          onClick={onClose}
          className="flex-1 border py-2 rounded hover:bg-gray-100 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
