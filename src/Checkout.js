import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const cart = useSelector(state => state.cart);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    phone: ''
  
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const user = useSelector(state => state.auth.user);
const isLoggedIn = !!user;

  const shippingCharge = 100;
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subtotal + shippingCharge;

  const handleChange = (e) => {
  const { id, value } = e.target;
  setFormData(prev => ({ ...prev, [id]: value }));

   if (errors[id] && value.trim()) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  }
};

const validateForm = () => {
  const newErrors = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (!value.trim()) {
      console.warn(`Missing field: ${key}`);
      newErrors[key] = 'This field is required';
    }
  });
  setErrors(newErrors);

  const isValid = Object.keys(newErrors).length === 0;
  console.log('Form valid?', isValid);
  return isValid;
};

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstInvalid = document.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  }, [errors]);

  const handleCompletePurchase = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setLoginError('⚠️ Please register or log in before completing the purchase.');
      return;
    }
    if (validateForm()) {
       console.log('Navigating to thankyou...');
      setLoginError('');
      navigate('/thankyou');
    }
  };

  return (
    <section className="checkout_section">
      <div className="container">
        <div className="row mb-2">
          <div className="col-lg-7">
            <h5 className="fw-bold mb-4">Billing Address</h5>
            <div className="row g-3">
              {[
                ['firstName', 'First Name'],
                ['lastName', 'Last Name'],
                ['email', 'Email Address'],
                ['address', 'Street Address'],
                ['city', 'City'],
                ['zip', 'Zip/Postal Code'],
                ['phone', 'Phone'],
              ].map(([id, label]) => (
                <div className="col-md-6" key={id}>
                  <div className="form-floating-group mb-2">
                    <input
                      type={id === 'email' ? 'email' : 'text'}
                      className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                    />
                    <label htmlFor={id}>{label}</label>
                    {errors[id] && <div className="invalid-feedback">{errors[id]}</div>}
                  </div>
                </div>
              ))}

              <div className="col-md-6">
                    <div className="mb-2">
                      {/* <label htmlFor="state" className="form-label">State/Province</label> */}
                      <select
                        className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                        id="state"
                        value={formData.state}
                        onChange={handleChange}
                        style={{padding:'16px 12px 8px'}}
                      >
                        <option value="" disabled hidden>Select State</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                        <option value="Florida">Florida</option>
                      </select>
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
              </div>

              <div className="col-12 mt-2">
                <p className="mt-2">
                  Create an account? <Link to="/login">Click here to Register</Link>
                </p>
              </div>

              {loginError && (
                <div className="alert alert-danger mt-2">{loginError}</div>
              )}
            </div>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <h5 className="fw-bold mb-4">Payment Details</h5>

            <div className="card-icons d-flex payment-icons mb-3">
              <img src="cards.png" alt="Visa" />
            </div>

            {/* <div className="row g-3">
              {[
                ['cardName', 'Card holder name'],
                ['cardNumber', 'Card Number'],
                ['cvv', 'CVV Code'],
                ['expiry', 'MM/YY'],
              ].map(([id, label]) => (
                <div className="col-md-6" key={id}>
                  <div className="form-floating-group mb-2">
                    <input
                      type="text"
                      className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                    />
                    <label htmlFor={id}>{label}</label>
                    {errors[id] && <div className="invalid-feedback">{errors[id]}</div>}
                  </div>
                </div>
              ))}
            </div> */}

            <div className="order-summary mt-4">
              <h5 className="mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>₹{shippingCharge.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-0 justify-content-between mb-5">
          <div className="col-md-2">
            <Link to="/cart" className="btn btn-black back-btn">
              <i className="fas fa-arrow-left"></i> Go Back
            </Link>
          </div>
          <div className="col-md-5 text-md-end mt-3 mt-md-0">
            <button className="btn btn-black back-btn" onClick={handleCompletePurchase}>
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
