import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const { customer, cartItems } = location.state || {};

  if (!customer) {
    navigate("/shop");
    return null;
  }

  const total = cartItems.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold mb-6">Confirm Your Order</h2>

        {/* CUSTOMER INFO */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Mobile:</strong> {customer.mobile}</p>
          <p><strong>Address:</strong> {customer.address}</p>

          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-blue-600 hover:underline"
          >
            ✏️ Edit Information
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Products</h3>

          {cartItems.map((item: any) => (
            <div key={item.id} className="flex gap-4 border-b py-3">
              <img src={item.image} className="w-20 h-20 object-contain" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right text-2xl font-bold mb-6">
          Total Payable: ₹{total}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => navigate("/shop")}
            className="border px-6 py-3 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => navigate("/payment")}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-semibold"
          >
            Confirm & Go to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
