import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from './features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setError('');
    dispatch(register({ email }));
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-4">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Register</h3>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            id="email"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>

        <button className="btn btn-dark w-100" onClick={handleRegister}>
          Register
        </button>

        <p className="mt-3 text-center text-muted">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
