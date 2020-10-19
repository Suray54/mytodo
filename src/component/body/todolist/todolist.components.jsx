import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { showAddToDo } from "../../../redux/todo/todo.selector";

import AddTodo from "./addtodo/addtodo.components";
import AllList from "./list/list.components";
export const Todolist = ({ showAddToDo }) => {
  return showAddToDo ? <AddTodo /> : <AllList />;
};
const mapStateToProps = createStructuredSelector({
  showAddToDo: showAddToDo,
});
export default connect(mapStateToProps)(Todolist);
