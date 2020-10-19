import { createSelector } from "reselect";

const selectTodo = (state) => state.todo;

export const showAddToDo = createSelector([selectTodo], (todo) => todo.addToDo);
export const selectToDos = createSelector([selectTodo], (todo) => todo.todos);
export const selectToDoLoading = createSelector(
  [selectTodo],
  (todo) => todo.todoisLoading
);

export const selectHeader = createSelector([selectTodo], (todo) => todo.header);
