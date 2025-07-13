import { useNavigate } from 'react-router-dom'; // Add this import at the top
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const { user } = useSelector(state => state.auth);
  const userDropdownRef = useRef();
const dispatch = useDispatch();
useEffect(() => {
  const handleClickOutside = (e) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
      setShowUserDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
const categories = ['Bracelets', 'Bangles', 'Chains', 'Earrings']; // You can add more
const [showSuggestions, setShowSuggestions] = useState(false);
const searchBoxRef = useRef();
  const navigate = useNavigate();
const [searchTerm, setSearchTerm] = useState('');
  const wishlist = useSelector(state => state.wishlist);
  const cart = useSelector(state => state.cart);
   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sidebarRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const openSidebar = () => {
    setIsMounted(true); // mount sidebar immediately but hidden
    setTimeout(() => {
      setIsOpen(true);  // trigger transition to slide in
    }, 20); // 20ms delay lets browser register initial offscreen position
  };

  const closeSidebar = () => {
    setIsClosing(true);
    setIsOpen(false); // trigger slide out transition
    setTimeout(() => {
      setIsMounted(false); // unmount after animation
      setIsClosing(false);
    }, 400); // match CSS transition duration
  };
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  return (
    <>
      <div className="announcement-bar text-center py-2">
        Midseason <span className="highlight fw-bold">Sale: 20% Off</span> - Auto Applied at Checkout - Limited Time Only.
      </div>

      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">

          {/* Logo */}
        
            <Link className="navbar-brand" to="/">
              <img src="/logo-jewel.png" alt="Pandora Logo" />
            </Link>
            
         

          {/* Center Navigation Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 d-none d-lg-flex">
           <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/collections">Collections</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          </ul>

          {/* Desktop Search */}
                    

          {/* Icons + Mobile Toggle */}
          <div className="d-flex align-items-center gap-3 icons_group">
           
      {/* Icon group row */}
                <div className="d-flex align-items-center justify-content-between">
                    <div className="icon-group d-flex align-items-center gap-3">
                    {/* Search Icon */}
                    <i
                        className="far fa-search"
                        style={{ cursor: "pointer" }}
                        onClick={() => setMobileSearchOpen((prev) => !prev)}
                    ></i>

                    {/* Other Icons */}
                    <Link to="/wishlist" className='position-relative'><i className="far fa-heart"></i> <span className="cart-badge position-absolute"> {wishlist.length}</span></Link>
                    <div className="position-relative" ref={userDropdownRef}>
                      <i
                        className="far fa-user"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowUserDropdown((prev) => !prev)}
                      ></i>

                      {showUserDropdown && (
                        <div className="dropdown-menu dropdown-menu-end show p-2 mt-2 shadow" style={{ position: 'absolute', right: 0 }}>
                         {user ? (
                      <>
                        <span style={{fontSize: '15px', lineHeight:'1'}}>Welcome, <strong>{user.email}</strong></span>
                        <button onClick={() => dispatch(logout())} className='logout'>Logout</button>
                      </>
                    ) : (
                      <>
                       
                        <Link className="dropdown-item" to="/login">Login</Link>
                        <Link className="dropdown-item" to="/register">Register</Link>
                      </>
                    )}
                         
                          {/* <Link className="dropdown-item" to="/login">
                            <i className="fas fa-sign-in-alt me-2"></i> Login
                          </Link>
                          <Link className="dropdown-item" to="/register">
                            <i className="fas fa-user-plus me-2"></i> Register
                          </Link> */}
                        </div>
                      )}
                    </div>

                    
                    
                    
                    <div className="position-relative">
                      <Link to="/cart" className="position-relative">
                        <i className="far fa-shopping-bag"></i>
                        {cartItemCount > 0 && (
                        <span className="cart-badge position-absolute">
                          {cartItemCount}
                        </span>
                        )}
                      </Link>
                    </div>
                    </div>
                </div>

      {/* Toggled Search Bar */}
      

            {/* Mobile Menu Toggle */}
                <button
                className="navbar-toggler"
                type="button"
                ref={toggleBtnRef}
                onClick={openSidebar}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        {mobileSearchOpen && (
  <div ref={searchBoxRef} className="search-box mt-2 position-absolute">
    <input
      type="text"
      placeholder="Search products..."
      className="form-control"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setShowSuggestions(true);
      }}
      onClick={() => setShowSuggestions(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
          navigate(`/collections?search=${encodeURIComponent(searchTerm.trim())}`);
          setSearchTerm('');
          setShowSuggestions(false);
        }
      }}
    />
    <i
      className="fas fa-times ms-2"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setMobileSearchOpen(false);
        setSearchTerm('');
        setShowSuggestions(false);
      }}
    ></i>

    {/* 🔽 Suggestions */}
    {showSuggestions && (
      <ul className="list-group position-absolute w-100 mt-1 z-3 list_style_search">
        {categories
          .filter(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((cat) => (
            <li
              key={cat}
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate(`/collections?search=${encodeURIComponent(cat)}`);
                setSearchTerm('');
                setShowSuggestions(false);
                setMobileSearchOpen(false);
              }}
            >
              {cat}
            </li>
          ))}
      </ul>
    )}
  </div>
)}

        </div>
      </nav>

        {(isMounted || isClosing) && (
        <div
          id="mobileSidebar"
          ref={sidebarRef}
          className={`custom-sidebar ${
            isOpen && !isClosing ? "open" : "closing"
          }`}
        >
          <div className="offcanvas-header justify-content-between px-3 py-2">
            <button
              id="sidebarClose"
              className="btn-close"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav flex-column px-3">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/collections">Collections</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
