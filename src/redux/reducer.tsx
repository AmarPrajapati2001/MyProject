// src/redux/reducer.js
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, MOVE_TODO } from './actions';

const initialState = {
  todos: {
    backlog: [],
    todo: [],
    inProgress: [],
    completed: []
  }
};

const todoReducer = (state = initialState, action) => {
  console.log('Action Type:', action.type);
  console.log('Action Payload:', action.payload);

  const { category = 'todo', index, title, description } = action.payload || {};

  switch (action.type) {
    case ADD_TODO:
      // Ensure category exists and is valid
      if (!state.todos[category]) {
        console.error('Invalid category for ADD_TODO:', category);
        return state;
      }

return {
  ...state,
  todos: {
    ...state.todos,
    [category]: [...state.todos[category], { title, description }]
  }
};
    case UPDATE_TODO:
      if (!state.todos[category]) {
        console.error('Invalid category for UPDATE_TODO:', category);
        return state;
      }
      return {
        ...state,
        todos: {
          ...state.todos,
          [category]: state.todos[category].map((todo, idx) =>
            idx === index ? { title, description } : todo
          )
        }
      };

    case DELETE_TODO:
      if (!state.todos[category]) {
        console.error('Invalid category for DELETE_TODO:', category);
        return state;
      }
      return {
        ...state,
        todos: {
          ...state.todos,
          [category]: state.todos[category].filter((_, idx) => idx !== index)
        }
      };

    case MOVE_TODO:
      const { fromCategory, toCategory } = action.payload;
      if (!state.todos[fromCategory] || !state.todos[toCategory]) {
        console.error('Invalid categories for MOVE_TODO:', fromCategory, toCategory);
        return state;
      }
      const todoToMove = state.todos[fromCategory][index];
      return {
        ...state,
        todos: {
          ...state.todos,
          [fromCategory]: state.todos[fromCategory].filter((_, idx) => idx !== index),
          [toCategory]: [...state.todos[toCategory], todoToMove]
        }
      };

    default:
      return state;
  }
};

export default todoReducer;