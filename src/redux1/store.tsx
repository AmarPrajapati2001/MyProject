// store.js
import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
  });

// Create Store
const store = createStore(rootReducer);



export default store;