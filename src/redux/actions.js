import axios from 'axios';

const loadProducts = ()=> {
  return (dispatch)=> {
    return axios.get('/api/products')
      .then( response => {
        dispatch({
          type: 'LOAD_PRODUCTS',
          data: response.data
        });
      });
  };
};

const updateProduct = (product)=> {
  return (dispatch)=> {
    return axios.put(`/api/products/${product.id}`, product)
      .then( () => {
        return dispatch(loadProducts());
      });
  };
};

const createProduct = (product)=> {
  return (dispatch)=> {
    return axios.post('/api/products/', product)
      .then( () => {
        return dispatch(loadProducts());
      });
  };
};

const destroyProduct = (product)=> {
  return (dispatch)=> {
    return axios.delete(`/api/products/${product.id}`)
      .then( () => {
        return dispatch(loadProducts());
      });
  };
};

export default { loadProducts, updateProduct, createProduct, destroyProduct };
