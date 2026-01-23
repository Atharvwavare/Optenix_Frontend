// src/components/CartPopup.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

export default function CartPopup({ onClose }: Props) {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) return null;

  const lastItem = cartItems[cartItems.length - 1];

  return (
    <div className="fixed top-24 right-6 w-50  bg-white shadow-xl border rounded-xl p-4 z-50">
      <h3 className="font-semibold mb-3">Added to Cart</h3>

      <div className="flex gap-3 mb-3">
        <img
          src={lastItem.image}
          alt={lastItem.name}
          className="w-16 h-16 object-contain border rounded"
        />
        <div>
          <p className="font-medium">{lastItem.name}</p>
          <p className="text-sm text-gray-600">
            Qty: {lastItem.quantity}
          </p>
          <p className="font-bold text-blue-700">₹{lastItem.price}</p>
        </div>
      </div>

      <p className="text-sm mb-3">Total items in cart: {totalQty}</p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Cart
        </button>
        <button
          onClick={onClose}
          className="flex-1 border py-2 rounded hover:bg-gray-100"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
