// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducer';

const store = createStore(dataReducer, applyMiddleware(thunk));

export default store;