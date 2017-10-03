import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './redux';

import Nav from './Components/Nav';
import Products from './Components/Products';

const Home = ()=> {
  return (
    <div className='well'>
      Home
    </div>
  );
};

ReactDOM.render((
  <Provider store= { store }>
    <Router>
      <div>
        <Route component={ Nav } />
        <Route exact path='/' component={ Home } />
        <Route path='/products' component={ Products } />
      </div>
    </Router>
  </Provider>
), document.getElementById('root'));
