import { TodoActionTypes } from "./todo.types";

export const setShowAddToDo = () => ({
  type: TodoActionTypes.SET_SHOW_ADDTODO,
});
export const setToDo = (todos) => ({
  type: TodoActionTypes.SET_TODO,
  payload: todos,
});
export const clearToDo = () => ({
  type: TodoActionTypes.CLEAR_TODO,
});

export const setTodoWithDate = (header) => ({
  type: TodoActionTypes.SET_TODO_WITHDATE,
  payload: header,
});

export const setTodoWithToday = (header) => ({
  type: TodoActionTypes.SET_TODO_WITHTODAY,
  payload: header,
});

export const setTodoWithDue = (header) => ({
  type: TodoActionTypes.SET_TODO_WITHDUE,
  payload: header,
});
export const setTodoWithProject = (header) => ({
  type: TodoActionTypes.SET_TODO_WITHPROJECT,
  payload: header,
});
