import { Routes, Route } from 'react-router-dom';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ProductDetails from "./pages/ProductDetails";
import Services from './pages/Services';
import Login from "./authenticate/Login";
import Register from './authenticate/Register';
import CartPage from './pages/CartPage';
import Admin from "./authenticate/Admin";


import ScrollToTop from './others/ScrollToTop';


import Profile from './authenticate/Profile';

import PlaceOrder from "./pages/PlaceOrder";
import ConfirmPayment from "./pages/ConfirmPayment";







function App() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />   {/* 🔥 THIS FIXES SCROLL ISSUE */}
      <Header />

      <main className="flex-grow">
       <Routes>


  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/blogs" element={<Blogs />} />
 

  <Route path="/career" element={<Career />} />
  <Route path='/services' element={<Services/>}/>
  <Route path="/contact" element={<Contact />} />

  <Route path="/shop/:id" element={<ProductDetails />} />
  
  {/* Add this route for the cart page */}
  <Route path="/cart" element={<CartPage />} />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

   <Route path="/place-order" element={<PlaceOrder />} />
<Route path="/confirm-order" element={<ConfirmPayment />} />
  {/* AFTER LOGIN */}
          <Route path="/home" element={<Home />} />
         
          <Route path="/admin" element={<Admin />} />

          <Route path='/profile' element={<Profile/>}/>

  


</Routes>

      </main>

      <Footer />
    </div>
  );
}

export default App;
