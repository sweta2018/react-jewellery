import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <>
      <section className="contact">
        <div className="container contact-section">
          <div className="row">
            <div className="col-md-4 contact-info mb-4">
              <div className="mb-4">
                <div className="contact-label">Address</div>
                <p>No: 58 A, East Madison Street,<br />Baltimore, MD, USA 4508</p>
              </div>
              <div className="mb-4">
                <div className="contact-label">Phone</div>
                <p>(00) 123 456 789</p>
                <p>1001234 56789</p>
              </div>
              <div className="mb-4">
                <div className="contact-label">Email</div>
                <Link to="mailto:info@example.com">info@example.com</Link><br />
                <Link to="mailto:support@example.com">support@example.com</Link>
              </div>
              <div className="mb-4">
                <div className="contact-label">Social</div>
                <div className="social-icons d-flex">
                  <Link><i className="fab fa-facebook-f"></i></Link>
                  <Link><i className="fab fa-twitter"></i></Link>
                  <Link><i className="fab fa-pinterest-p"></i></Link>
                  <Link><i className="fab fa-instagram"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="form-title">Tell Us Your Message</div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your Name (required)"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Your Email (required)"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="message"
                    rows="5"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-dark">Send Message</button>
                {submitted && (
                  <div className="alert alert-success mt-3">
                    ✅ Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
