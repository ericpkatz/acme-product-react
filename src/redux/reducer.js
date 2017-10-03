import { combineReducers } from 'redux';


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

export default reducer;

