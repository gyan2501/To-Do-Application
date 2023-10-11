import {
  ADD_TODO,
  CHANGE_TODO_STATUS,
  DELETE_TODO,
  EDIT_TODO,
  TODO_FAILURE,
  TODO_SUCCESS,
} from "./actionTypes";

const initialSate = {
  todos: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = initialSate, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };

    case EDIT_TODO:
      return {
        ...state,
        isLoading: false,
        isError: false,
        todos: state.todos.map((el) => (el.id === payload.id ? payload : el)),
      };

    case DELETE_TODO:
      return { ...state, todos: state.todos.filter((el) => el.id !== payload) };

    case CHANGE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((el) =>
          el.id === payload ? { ...el, status: !el.status } : el
        ),
      };

    case TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case TODO_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
