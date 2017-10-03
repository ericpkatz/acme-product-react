import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducer';

import actions from './actions';
import mappers from './mappers';



const store = createStore(reducer, applyMiddleware(thunk));


export default store;

export {  actions, mappers };
