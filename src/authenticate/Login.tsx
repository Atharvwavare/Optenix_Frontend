import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const state = location.state as any;

  // Redirect after login
  const from = state?.from || "/shop";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return (setEmailError("Email is required"), false);
    if (!emailRegex.test(value))
      return (setEmailError("Invalid email address"), false);
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) return (setPasswordError("Password is required"), false);
    setPasswordError("");
    return true;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateEmail(email) || !validatePassword(password)) return;

  
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Server did not return valid JSON");
    }

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    login(data.user, data.token);

    if (data.user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate(from, { replace: true });
    }

  } catch (err: any) {
    alert(err.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0057] to-[#2f1fff] px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to Optenix
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
            {emailError && (
              <p className="text-sm text-red-600 mt-1">{emailError}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                className="w-full px-4 py-3 border rounded-lg pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-600 mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            state={{ from }}
            className="text-blue-600 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
