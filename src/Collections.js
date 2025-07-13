import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/product/productSlice';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from './features/cart/cartSlice';

const Collections = () => {
  const dispatch = useDispatch();
  const { items: allProducts, status } = useSelector((state) => state.product);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: null,
    category: '',
    occasion: '',
    sort: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status !== 'succeeded') return;

    let products = [...allProducts];

    // 🔍 Apply search filter first
    if (searchQuery) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.occasion && p.occasion.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.price) {
      const [min, max] = filters.price;
      products = products.filter((p) => p.price >= min && p.price <= max);
    }

    if (filters.category && !searchQuery) {
      products = products.filter((p) => p.category === filters.category);
    }

    if (filters.occasion && !searchQuery) {
      products = products.filter((p) => p.occasion === filters.occasion);
    }

    if (filters.sort === 'lowToHigh') {
      products.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'highToLow') {
      products.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'bestSelling') {
      products.sort((a, b) => b.sold - a.sold);
    }

    setFilteredProducts(products);
    setCurrentPage(1);
  }, [filters, allProducts, searchQuery, status]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (status === 'loading') {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  return (
    <div className="container my-1">
      <img src='banner-coll 1.png' className='img-fluid mb-5' />
      <h2 className="text-center mb-4 section-title">Our Collections</h2>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#filterOptions">
            <i className="bi bi-funnel"></i> Show Filter
          </button>
          <div className="dropdown best_sell_filter">
            <select
              className="form-select btn btn-outline-dark"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}>
              <option value="">Best Selling</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
            {filters.sort && (
              <button
                className="btn btn-outline-dark"
                onClick={() => handleFilterChange('sort', '')}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <hr />

        <div className="collapse show" id="filterOptions">
          <div className="row g-3">
            <div className="col-5">
              <h6 className="fw-bold">Price</h6>
              <div className="d-flex flex-wrap gap-2">
                {[{ label: '₹1000 - ₹2000', range: [1000, 2000] }, { label: '₹2001 - ₹4000', range: [2001, 4000] }, { label: '₹4001 - ₹5000', range: [4001, 5000] }].map(({ label, range }) => {
                  const isActive = JSON.stringify(filters.price) === JSON.stringify(range);
                  return (
                    <button
                      key={label}
                      className={`btn ${isActive ? 'btn-dark text-white' : 'btn-outline-dark'}`}
                      onClick={() => handleFilterChange('price', range)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-4">
              <h6 className="fw-bold">Categories</h6>
              <div className="d-flex flex-wrap gap-2">
                {['Bracelets', 'Bangles', 'Chains', 'Earrings'].map((cat) => (
                  <button
                    key={cat}
                    className={`btn ${filters.category === cat ? 'btn-dark text-white' : 'btn-outline-dark'}`}
                    onClick={() => handleFilterChange('category', cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-3 position-relative">
              <h6 className="fw-bold">Shop By Occasions</h6>
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {['Bridal', 'Ethnic'].map((occasion) => (
                  <button
                    key={occasion}
                    className={`btn ${filters.occasion === occasion ? 'btn-dark text-white' : 'btn-outline-dark'}`}
                    onClick={() => handleFilterChange('occasion', occasion)}
                  >
                    {occasion}
                  </button>
                ))}
                <button
                  className="btn btn-danger btn-sm mt-0 text-end filter_btn"
                  onClick={() => setFilters({ price: null, category: '', occasion: '', sort: '' })}>
                  <i className="far fa-times"></i> Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 mt-4">
          {filteredProducts.length === 0 ? (
            <p>No products match the selected filters.</p>
          ) : (
            <>
              <div className="row">
                {currentProducts.map((product) => (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <div className="card shadow-sm h-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img-top rounded-top"
                        style={{ height: 250, objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title text-truncate">{product.name}</h5>
                          <p className="mb-1 d-flex justify-content-between">
                            <span className="fw-bold text-danger">
                              ₹{product.price}{' '}
                              <span className="text-muted text-decoration-line-through">
                                ₹{product.cutOffPrice || (product.price + 500)}
                              </span>
                            </span>
                            <span>{product.ratings || 4.5} / 5</span>
                          </p>
                        </div>
                        <div className="d-flex gap-2 mt-auto">
                          <Link to={`/product/${product.id}`} className="btn btn-outline-dark btn-sm w-50 py-2">
                            View Details
                          </Link>
                          <button
                            className="btn btn-dark btn-sm w-50 py-2"
                            onClick={() => {
                              dispatch(addToCart({ ...product, quantity: 1 }));
                              toast.success('Added to cart');
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
