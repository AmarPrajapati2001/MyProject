// src/redux/actions.js
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const MOVE_TODO = 'MOVE_TODO';

export const moveTodo = (index, fromCategory, toCategory) => ({
  type: MOVE_TODO,
  payload: { index, fromCategory, toCategory }
});

export const addTodo = (title, description, category = 'todo') => ({
  type: ADD_TODO,
  payload: { title, description, category },
});

export const updateTodo = (index, title, description, category = 'todo') => ({
  type: UPDATE_TODO,
  payload: { index, title, description, category },
});

export const deleteTodo = (index, category = 'todo') => ({
  type: DELETE_TODO,
  payload: { index, category },
});