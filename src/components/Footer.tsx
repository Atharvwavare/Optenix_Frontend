import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import OptenixLogo from "../images/Optenix.png"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="text-xl font-bold cursor-pointer text-white"><img src={OptenixLogo} alt="" height={20} width={140} /></span>
            </div>
            <p className="text-sm mb-4">
              Leading provider of digital solutions and innovative tech products for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-400 transition-colors text-sm">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-blue-400 transition-colors text-sm">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  Cloud Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  AI & Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  Security Tools
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  Business Apps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  Developer Tools
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Geras Imperium Rise, Near Wipro Circle Metro Station, Hinjewadi Phase II, Pune, Maharashtra</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">+91 9766855918</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">sneha.sahare@optenix.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Optenix Tech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
