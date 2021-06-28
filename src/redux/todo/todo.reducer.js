import { TodoActionTypes } from "./todo.types";
import {
  setWithDate,
  setWithToday,
  setWithDue,
  setWithProject,
} from "./todo.util";
const INITIAL_STATE = {
  alltodos: [],
  selectedtodos: [],
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
        alltodos: action.payload,
        selectedtodos: action.payload,
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
        selectedtodos: setWithDate(state.alltodos),
        header: action.payload,
      };
    case TodoActionTypes.SET_TODO_WITHTODAY:
      return {
        ...state,
        selectedtodos: setWithToday(state.alltodos),
        header: action.payload,
      };
    case TodoActionTypes.SET_TODO_WITHDUE:
      return {
        ...state,
        selectedtodos: setWithDue(state.alltodos, action.payload),
        header: action.payload,
      };

    case TodoActionTypes.SET_TODO_WITHPROJECT:
      return {
        ...state,
        selectedtodos: setWithProject(state.alltodos, action.payload),
        header: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
