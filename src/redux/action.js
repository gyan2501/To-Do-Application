import {
  ADD_TODO,
  CHANGE_TODO_STATUS,
  DELETE_TODO,
  EDIT_TODO,
  TODO_FAILURE,
  
  TODO_SUCCESS,
} from "./actionTypes";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const editTodo = (todo) => ({
  type: EDIT_TODO,
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const changeStatus = (id) => ({
  type: CHANGE_TODO_STATUS,
  payload: id,
});



export const todoSuccess = () => ({
  type: TODO_SUCCESS,
});

export const todoFailure = () => ({
  type: TODO_FAILURE,
});
