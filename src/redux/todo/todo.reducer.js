import { TodoActionTypes } from "./todo.types";
import {
  setWithDate,
  setWithToday,
  setWithDue,
  setWithProject,
} from "./todo.util";
const INITIAL_STATE = {
  todos: [],
  header: "All Tasks",
  addToDo: false,
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodoActionTypes.SET_SHOW_ADDTODO:
      return {
        ...state,
        addToDo: !state.addToDo,
      };
    case TodoActionTypes.SET_TODO:
      return {
        ...state,
        todos: action.payload,
        header: "All Todos",
      };

    case TodoActionTypes.CLEAR_TODO:
      return {
        ...state,
        todos: [],
      };
    case TodoActionTypes.SET_TODO_WITHDATE:
      return {
        ...state,
        todos: setWithDate(state.todos),
        header: action.payload,
      };
    case TodoActionTypes.SET_TODO_WITHTODAY:
      return {
        ...state,
        todos: setWithToday(state.todos),
        header: action.payload,
      };
    case TodoActionTypes.SET_TODO_WITHDUE:
      return {
        ...state,
        todos: setWithDue(state.todos, action.payload),
        header: action.payload,
      };

    case TodoActionTypes.SET_TODO_WITHPROJECT:
      return {
        ...state,
        todos: setWithProject(state.todos, action.payload),
        header: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
