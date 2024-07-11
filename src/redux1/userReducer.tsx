// userReducer.js
import { SET_USER } from './actions';

// Initial State
const initialState = {
  user: null,
};

// User Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;