import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import OptenixLogo from "../images/OptenixWhite.png";
import OptenixBlackLogo from "../images/OptenixBlack.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();


  const { user, logout } = useAuth();

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Dummy user from localStorage
 

  // Scroll effect (only background + shadow, no width change)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/career" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
  logout(); // clears user + token + state
  setShowUserMenu(false);
  navigate("/login");
};


  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-gradient-to-r from-[#3b0a6f] via-[#4b117f] to-[#2f1fff]"
        }`}
      >
        {/* FIXED WIDTH CONTAINER */}
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* LOGO (fixed height always, no jump) */}
            <img
              src={scrolled ? OptenixBlackLogo : OptenixLogo}
              alt="Optenix"
              className="h-14 w-auto transition-opacity duration-300 cursor-pointer"
              onClick={() => navigate("/")}
            />

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-semibold transition-colors ${
                    scrolled
                      ? isActive(link.path)
                        ? "text-blue-600"
                        : "text-gray-800 hover:text-blue-600"
                      : isActive(link.path)
                        ? "text-white"
                        : "text-gray-200 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transform transition-transform duration-300 origin-left ${
                      isActive(link.path)
                        ? "scale-x-100"
                        : "scale-x-0 hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-5 relative">
              {/* USER LOGIN / PROFILE */}
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    scrolled
                      ? "text-gray-800 hover:text-blue-600"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Login</span>
                </button>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 font-medium transition-colors ${
                      scrolled
                        ? "text-gray-800 hover:text-blue-600"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    <User className="w-6 h-6" />
                    <span className="hidden sm:block">{user.name}</span>
                  </button>

                  {/* USER DROPDOWN */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                      <div className="p-4 border-b">
                        <p className="font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate("/profile");
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-black"
                      >
                        My Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CART */}
              <button
                onClick={() => navigate("/cart")}
                className={`hidden md:flex items-center gap-2 transition-colors ${
                  scrolled ? "text-gray-800 hover:text-blue-600" : "text-white"
                }`}
              >
                {/* Wrap icon in relative div */}
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />

                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItems.reduce((t, i) => t + i.quantity, 0)}
                    </span>
                  )}
                </div>

                <span className="text-md font-semibold">Cart</span>
              </button>

              {/* HAMBURGER */}
              <button
                className={`md:hidden ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* TOP */}
          <div className="flex items-center justify-between mb-6">
            <img src={OptenixBlackLogo} alt="Optenix" className="h-10" />
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-4 flex-grow">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium ${
                  isActive(link.path)
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* MOBILE ACTIONS */}
          {!user ? (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
              className="w-full mt-4 py-3 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 rounded-lg font-semibold"
            >
              <User className="w-5 h-5" />
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full mt-4 py-3 flex items-center justify-center gap-2 border border-red-500 text-red-600 rounded-lg font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}

          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/cart");
            }}
            className="w-full mt-3 py-3 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 rounded-lg font-semibold"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart ({cartItems.reduce((t, i) => t + i.quantity, 0)})
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
