// src/pages/PlaceOrder.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function PlaceOrder() {
  const { user, updateUser } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // -------------------- FORM STATE --------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // -------------------- ERROR STATE --------------------
  const [errors, setErrors] = useState({
    billingAddress: "",
    shippingAddress: "",
  });

  // -------------------- AUTH CHECK --------------------
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        billingAddress: user.address || "",
        shippingAddress: user.address || "",
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  // -------------------- FORM HANDLER --------------------
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------- CURRENT LOCATION --------------------
  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      const data = await res.json();
      const fullAddress = data.display_name;

      setForm((prev) => ({
        ...prev,
        billingAddress: fullAddress,
        shippingAddress: sameAsBilling ? fullAddress : prev.shippingAddress,
      }));

      setErrors({ billingAddress: "", shippingAddress: "" });
    });
  };

  // -------------------- CONTINUE --------------------
  const handleContinue = () => {
    let hasError = false;
    const newErrors = { billingAddress: "", shippingAddress: "" };

    // Billing required
    if (!form.billingAddress || form.billingAddress.trim().length < 10) {
      newErrors.billingAddress = "Please enter billing address";
      hasError = true;
    }

    // Shipping required if not same
    if (
      !sameAsBilling &&
      (!form.shippingAddress || form.shippingAddress.trim().length < 10)
    ) {
      newErrors.shippingAddress = "Please enter shipping address";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const finalData = {
      ...form,
      shippingAddress: sameAsBilling
        ? form.billingAddress
        : form.shippingAddress,
    };

    updateUser({ ...user, ...finalData });

    navigate("/confirm-order", {
      state: { customer: finalData, cartItems },
    });
  };

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-3">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">

        {/* LEFT */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-3 border px-3 py-2 rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-3 border px-3 py-2 rounded"
          />

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full mb-3 border px-3 py-2 rounded"
          />

          {/* BILLING ADDRESS */}
          <textarea
            value={form.billingAddress}
            onChange={(e) => {
              setForm({ ...form, billingAddress: e.target.value });
              setErrors({ ...errors, billingAddress: "" });
            }}
            placeholder="Billing Address *"
            rows={3}
            className={`w-full mb-1 border px-3 py-2 rounded ${
              errors.billingAddress ? "border-red-500" : ""
            }`}
          />
          {errors.billingAddress && (
            <p className="text-red-600 text-sm mb-2">
              {errors.billingAddress}
            </p>
          )}

          <button
            onClick={useCurrentLocation}
            className="mb-4 text-blue-600 underline"
          >
            Use Current Location
          </button>

          {/* SAME AS BILLING */}
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => {
                setSameAsBilling(e.target.checked);
                if (e.target.checked) {
                  setForm((prev) => ({
                    ...prev,
                    shippingAddress: prev.billingAddress,
                  }));
                  setErrors({ ...errors, shippingAddress: "" });
                }
              }}
            />
            Shipping address same as billing
          </label>

          {/* SHIPPING ADDRESS */}
          {!sameAsBilling && (
            <>
              <textarea
                value={form.shippingAddress}
                onChange={(e) => {
                  setForm({ ...form, shippingAddress: e.target.value });
                  setErrors({ ...errors, shippingAddress: "" });
                }}
                placeholder="Shipping Address *"
                rows={3}
                className={`w-full mb-1 border px-3 py-2 rounded ${
                  errors.shippingAddress ? "border-red-500" : ""
                }`}
              />
              {errors.shippingAddress && (
                <p className="text-red-600 text-sm mb-2">
                  {errors.shippingAddress}
                </p>
              )}
            </>
          )}

          {/* CONTINUE */}
          <button
            type="submit"
            onClick={handleContinue}
            className="mt-4 w-full py-3 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue to Confirm Order
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full mt-4 text-blue-600 hover:underline"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b py-3">
              <img src={item.image} className="w-16 h-16 object-contain" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
