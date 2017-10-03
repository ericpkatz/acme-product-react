import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../redux';
import { Link } from 'react-router-dom';

class Nav extends Component{
  componentDidMount(){
    this.props.loadProducts();
  }
  render(){
    const { products, location } = this.props;
    const selected = (path)=> {
      return location.pathname === path;
    }
    return (
      <ul>
        <li>
        {
          selected('/') ? (
            'Home '
          ): (
            <Link to='/'>Home</Link>
          )
        }
        </li>
        <li>
        {
          selected('/products') ? (
            `Products (${ products.length })`
          ): (
            <Link to='/products'>Products ({ products.length })</Link>
          )
        }
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    loadProducts: ()=> dispatch(actions.loadProducts())
  };
};

const mapStateToProps = (({ products }) => {
  return {
    products
  };
});

Nav = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default Nav;
