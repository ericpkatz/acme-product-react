import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products, pathname })=> {
  return (
    <ul>
      {
        products.map( product => {
          const url = `/products/${product.id}`; 
          const active = url === pathname;
          return (
            <li key={ product.id }>
              {
                active ? <span style={{ border: 'solid 1px black'}}>product.name</span>  : (
                  <Link to={ url }>{ product.name }</Link>
                )
              }
            </li>
          );
        })
      }
    </ul>
  );
};

export default ProductList;
