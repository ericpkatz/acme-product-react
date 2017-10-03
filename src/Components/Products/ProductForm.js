import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, createProduct, destroyProduct } from '../../redux';

class ProductForm extends Component{
  constructor({ product }){
    super();
    this.state = { };
    if(product){
      this.state = { product: Object.assign({}, product), message: '' };
    }
    this.save = this.save.bind(this);
    this.destroy = this.destroy.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({ product: Object.assign({}, nextProps.product), message: '' });
  }
  destroy(){
    this.props.destroy(this.state.product)
      .catch(()=> this.setState({ message: 'error' }));
  }
  save(){
    this.props.save(this.state.product)
      .then(()=> this.setState({ message: null }))
      .catch(()=> this.setState({ message: 'error' }));
  }
  render(){
    const { product, editing } = this.props;
    const { save, destroy } = this;
    const { message } = this.state;
    let _product;
    if(this.state.product){
      _product = this.state.product;
    }
    const onChange = (ev)=> {
      const product = this.state.product;
      product.name = ev.target.value;
      this.setState({ product });
    }
    if(!product){
      return null;
    }
    return (
      <div>
        <h2>
        {
          editing ? 'Editing' : 'Adding'
        }
        </h2>
        { product.name }
        <br />
        <input value={ _product.name } onChange={ onChange } />
        {
          product.name === _product.name ? (null): (
            <button onClick={ save }>Save</button>
          )
        }
        {
          editing && <button onClick={ destroy }>Delete</button>
        }
        { message && <div style={ { color: 'red' }}>message</div>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { match, history })=> {
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

const mapStateToProps = ({ products }, { match })=> {
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
