import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';


const productsReducer = (state=[], action) => {
  switch(action.type){
    case 'LOAD_PRODUCTS':
      state = action.data;
      break;
  }
  return state;
};
const reducer = combineReducers({
  products: productsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

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

export default store;
export { loadProducts, updateProduct, createProduct, destroyProduct };
