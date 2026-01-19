import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useState, useEffect } from "react";
import OptenixLogo from "../images/Optenix.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-gradient-to-r from-[#3b0a6f] via-[#4b117f] to-[#2f1fff]"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center">
              <img src={OptenixLogo} alt="Optenix" className="h-16 w-auto" />
            </Link>

            {/* DESKTOP NAV */}
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

      {/* UNDERLINE */}
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

            {/* ACTIONS */}
            <div className="flex items-center gap-5">

              {/* LOGIN (Desktop + Mobile) */}
              <button
                onClick={() => navigate("/login")}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  scrolled
                    ? "text-gray-800 hover:text-blue-600"
                    : "text-white hover:text-gray-200"
                }`}
              >
                <User className="w-5 h-5 " />
                <span className="text-sm">Login</span>
              </button>

              {/* CART (Desktop only) */}
              <button
                 onClick={()=> navigate("/shop")}
                className={`hidden md:flex items-center gap-2 transition-colors ${
                  scrolled
                    ? "text-gray-800 hover:text-blue-600"
                    : "text-white"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
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

      {/* RIGHT DRAWER */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">

          {/* DRAWER HEADER */}
          <div className="flex items-center justify-between mb-6">
            <img src={OptenixLogo} alt="Optenix" className="h-10" />
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* NAV LINKS */}
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

          {/* LOGIN BUTTON */}
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

          {/* CTA */}
          <button className="w-full mt-3 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold">
            Get Started
          </button>

        </div>
      </div>
    </>
  );
}
