import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const Products = ({ products, pathname }) => {
  return (
    <div>
      <h1>
        Products { products.length }
      </h1>
      <ProductList products={ products } pathname= { pathname } />
      <Link to='/products/add'>Add A Product</Link>
      <Route component={ ProductForm } path='/products/add' />
      <Route component={ ProductForm } path='/products/:id' />
    </div>
  );
}

const mapStateToProps = ({ products }, { location }) => {
  return {
    products,
    pathname: location.pathname
  };
};

export default connect(mapStateToProps)(Products);
