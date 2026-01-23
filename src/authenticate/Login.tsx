import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailError("Email is required");
      return false;
    }

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (value: string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!value) {
      setPasswordError("Password is required");
      return false;
    }

    if (!specialCharRegex.test(value)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const { login } = useAuth();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!isEmailValid || !isPasswordValid) return;

  // 🔥 TEST LOGIN DATA (FRONTEND ONLY)
const fakeUser = {
  name: "User",
  email: email,
  role: "user" as "user",   // 👈 FIX
};


  const fakeToken = "test-token-123";

  // ✅ SAVE TO CONTEXT
  login(fakeUser, fakeToken);

  alert("Login successful!");
  navigate("/home");   // 🔥 GO TO HOME PAGE
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0057] to-[#2f1fff] px-4">
      <div className="bg-white p-8 rounded-1xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Optenix
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-600"
              }`}
              required
            />
            {emailError && (
              <p className="text-sm text-red-600 mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 pr-12 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {passwordError && (
              <p className="text-sm text-red-600 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Button UNCHANGED */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
