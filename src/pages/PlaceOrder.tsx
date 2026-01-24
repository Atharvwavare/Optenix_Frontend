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
    gst: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);

  // -------------------- OTP STATE --------------------
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // -------------------- AUTH CHECK --------------------
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        gst: "",
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

  // -------------------- OTP LOGIC --------------------
  const sendOtp = () => {
    if (!form.mobile || form.mobile.length < 10) {
      alert("Enter valid mobile number");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔐 DEMO OTP:", otp); // shown in console for testing

    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpVerified(false);

    alert("OTP sent to your mobile (check console for demo)");
  };

  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setOtpVerified(true);
      alert("✅ Mobile number verified");
    } else {
      alert("❌ Invalid OTP");
    }
  };

  // -------------------- CURRENT LOCATION --------------------
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Simple location text (no API needed)
        const locationText = `Lat: ${latitude.toFixed(
          4
        )}, Lng: ${longitude.toFixed(4)}`;

        setForm((prev) => ({
          ...prev,
          billingAddress: locationText,
          shippingAddress: sameAsBilling ? locationText : prev.shippingAddress,
        }));
      },
      () => alert("Unable to get location")
    );
  };

  // -------------------- CONTINUE --------------------
  const handleContinue = () => {
    if (!otpVerified) {
      alert("Please verify your mobile number first");
      return;
    }

    const finalData = {
      ...form,
      shippingAddress: sameAsBilling
        ? form.billingAddress
        : form.shippingAddress,
    };

    updateUser({ ...user, ...finalData });

    navigate("/confirm-order", {
      state: {
        customer: finalData,
        cartItems,
      },
    });
  };

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT - CUSTOMER INFO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

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

          {/* MOBILE + OTP */}
          <div className="flex gap-2 mb-3">
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              onClick={sendOtp}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Send OTP
            </button>
          </div>

          {otpSent && !otpVerified && (
            <div className="flex gap-2 mb-3">
              <input
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="Enter OTP"
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                onClick={verifyOtp}
                className="bg-green-600 text-white px-4 rounded"
              >
                Verify
              </button>
            </div>
          )}

          {otpVerified && (
            <p className="text-green-600 mb-3">✅ Mobile Verified</p>
          )}

          {/* GST (OPTIONAL) */}
          <input
            name="gst"
            value={form.gst}
            onChange={handleChange}
            placeholder="GST Number (Optional)"
            className="w-full mb-3 border px-3 py-2 rounded"
          />

          {/* BILLING ADDRESS */}
          <textarea
            name="billingAddress"
            value={form.billingAddress}
            onChange={handleChange}
            placeholder="Billing Address"
            rows={3}
            className="w-full mb-2 border px-3 py-2 rounded"
          />

          <button
            onClick={useCurrentLocation}
            className="mb-4 text-blue-600 underline"
          >
            📍 Use Current Location
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
                }
              }}
            />
            Shipping address same as billing
          </label>

          {/* SHIPPING ADDRESS */}
          {!sameAsBilling && (
            <textarea
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
              placeholder="Shipping Address"
              rows={3}
              className="w-full mb-3 border px-3 py-2 rounded"
            />
          )}

          {/* CONTINUE BUTTON */}
          <button
            onClick={handleContinue}
            disabled={!otpVerified}
            className={`mt-4 w-full py-3 rounded font-semibold text-white
              ${
                otpVerified
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Continue to Confirm Order
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="mt-3 w-full border py-2 rounded"
          >
            ← Back to Cart
          </button>
        </div>

        {/* RIGHT - ORDER PREVIEW */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Your Products</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b py-3">
              <img src={item.image} className="w-20 h-20 object-contain" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p className="font-bold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
