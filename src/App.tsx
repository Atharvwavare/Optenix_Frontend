import { Routes, Route, useLocation } from "react-router-dom";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Services from "./pages/Services";
import Login from "./authenticate/Login";
import Register from "./authenticate/Register";
import CartPage from "./pages/CartPage";
import AdminProducts from "./authenticate/AdminProducts";
import Profile from "./authenticate/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import ConfirmPayment from "./pages/ConfirmPayment";
import PaymentPage from "./pages/PaymentPage";

import ScrollToTop from "./others/ScrollToTop";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/payment" || location.pathname === "/success";

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {!hideLayout && <Header />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/career" element={<Career />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Orders */}
          <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route
            path="/confirm-order"
            element={
              <ProtectedRoute>
                <ConfirmPayment />
              </ProtectedRoute>
            }
          />
          <Route path="/payment" element={<PaymentPage />} />

          {/* 🔐 Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
