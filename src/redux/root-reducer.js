import { combineReducers } from "redux";
import projectReducer from "./projects/project.reducer";
import todoReducer from "./todo/todo.reducer";
import userReducer from "./user/user.reducer";
export default combineReducers({
  user: userReducer,
  todo: todoReducer,
  project: projectReducer,
});
