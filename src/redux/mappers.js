import actions from './actions';
const { updateProduct, createProduct, destroyProduct } = actions;

const productFormStateMapper = ({ products }, { match }) => {
  const editing = !!match.params.id;
  let product = products.find( product => product.id === match.params.id*1); 
  if(!editing){
    product = { name: '' };
  }
  return {
    product,
    editing 
  };
};

const productFormDispatchMapper = (dispatch, { match, history })=> {
  const editing = !!match.params.id;
  const method = editing ? updateProduct : createProduct;
  return {
    save: (product)=> dispatch(method(product)),
    destroy: (product)=> {
      return dispatch(destroyProduct(product))
                .then(()=> history.push('/products'));
    }
  };
};

export default { productFormStateMapper, productFormDispatchMapper };
