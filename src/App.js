import React from 'react';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './Home';
import Collections from './Collections';
import About from './About';
import Contact from './Contact';
import Cart from './Cart';
import Wishlist from './Wishlist';
import ProductDetails from './ProductDetails';
import Login from './Login';
import Register from './Register';
import Footer from './component/Footer';
import Checkout from './Checkout';
import ThankYou from './ThankYou';
function App() {
  return (
    <div className="App">
     
       <Router>
        <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Footer/>
    </div>
  );
}

export default App;
