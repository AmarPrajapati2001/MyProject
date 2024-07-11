// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { INCREMENT, DECREMENT, SET_USER, FETCH_USER_SUCCESS } from './actions';

// Initial States
const initialCounterState = {
  count: 0,
};

const initialUserState = {
  user: null,
};

// Counter Reducer
const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

// User Reducer
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

// Create Store with Thunk Middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;