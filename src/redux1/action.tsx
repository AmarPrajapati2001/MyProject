// actions.js

// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_USER = 'SET_USER';

// Action Creators
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});