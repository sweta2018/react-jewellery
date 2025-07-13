import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/product/productSlice';
import ProductCard from './component/ProductCard';
import Banner from './component/Banner';
// import Products from './component/Products';
import HomeCollection from './component/HomeCollection';
import Testimonial from './component/Testimonial';
import Trust from './component/Trust';
import Instagram from './component/Instagram';

function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  return (
    <>
        <Banner/>
        <HomeCollection/>
       {/* {items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))} */}
      <ProductCard products={items} />
        <Testimonial/>
        <Trust/>
        <Instagram/>
    </>
  )
}

export default Home