import React, { Component } from "react";
import "./list.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  auth,
  firestore,
  convertTodoSnapShotToDateMap,
  deleteTodo,
  completedTodo,
} from "./../../../../firebase/firebase.utils";
import { FaTrash } from "react-icons/fa";
import {
  setToDo,
  clearToDo,
  setShowAddToDo,
} from "./../../../../redux/todo/todo.actions";
import {
  selectHeader,
  selectToDos,
} from "../../../../redux/todo/todo.selector";

export class AllList extends Component {
  componentDidMount() {
    const { setToDo, clearToDo } = this.props;
    this.unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const showRef = await firestore
          .collection("Todo")
          .where("uid", "==", userAuth.uid);

        showRef.onSnapshot((snap) => {
          let documents = [];
          snap.docs.map((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
            return documents;
          });

          const maindocs = convertTodoSnapShotToDateMap(documents);
          setToDo(maindocs);
        });
      } else {
        await clearToDo();
      }
    });
  }

  handleCompleted(id) {
    completedTodo(id);
  }
  handleDelete(id) {
    deleteTodo(id);
  }

  convertIntoDate = (seconds) => {
    let date = new Date(seconds);

    return date.toLocaleString();
  };
  render() {
    const { selectToDos, setShowAddToDo, selectHeader } = this.props;
    let output;

    if (!selectToDos.length && setShowAddToDo)
      output = (
        <div className="list">
          <h1 className="Heading">Empty</h1>

          <p className="list__addtodo" onClick={setShowAddToDo}>
            <span>+</span>Click to Add your first task.
          </p>
        </div>
      );
    else
      output = (
        <div className="list">
          <h1 className="Heading"> {selectHeader}</h1>

          <div className="list__todo">
            {selectToDos.map((selectToDo) => (
              <ul className="list__todo--single" key={selectToDo.id}>
                <li>
                  <span
                    className={
                      selectToDo.completed
                        ? "checkbox-completed checkbox"
                        : "checkbox"
                    }
                    onClick={() => this.handleCompleted(selectToDo.id)}
                  ></span>
                  <div className="list__todo--detail">
                    <p
                      className={
                        selectToDo.completed ? "task-completed task" : "task"
                      }
                    >
                      {selectToDo.addtask}
                    </p>
                    <p className="mr-5"> {selectToDo.addproject}</p>
                    <p className="mr-5">
                      {this.convertIntoDate(selectToDo.createdAt)}
                    </p>

                    <div
                      className="list__todo--trash"
                      onClick={() => this.handleDelete(selectToDo.id)}
                    >
                      <FaTrash />
                    </div>
                  </div>
                </li>
                <hr />
              </ul>
            ))}
          </div>
          <p className="list__addtodo withcolor" onClick={setShowAddToDo}>
            <span>+</span> Add New Task
          </p>
        </div>
      );

    return output;
  }
}
const mapStateToProps = createStructuredSelector({
  selectToDos: selectToDos,
  selectHeader: selectHeader,
});
const mapDispatchToProps = (dispatch) => ({
  setToDo: (todoMap) => dispatch(setToDo(todoMap)),
  clearToDo: () => dispatch(clearToDo()),
  setShowAddToDo: () => dispatch(setShowAddToDo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllList);
