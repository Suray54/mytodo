import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setShowAddToDo } from "../../../../redux/todo/todo.actions";
import { firebaseAddToDo } from "../../../../firebase/firebase.utils";
import { selectCurrentUser } from "../../../../redux/user/user.selector";
import { selectAllProject } from "../../../../redux/projects/project.selector";

import "./addtodo.styles.scss";

export class Addtodo extends Component {
  constructor() {
    super();
    this.state = {
      addtask: "",
      addproject: "",
      date: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { setShowAddToDo } = this.props;
    const { addtask, addproject } = this.state; //, date
    const { selectCurrentUser } = this.props;
    const { uid } = selectCurrentUser;

    try {
      const createdAt = Date.now();

      firebaseAddToDo({ addtask, uid, createdAt, addproject });
      this.setState({
        addtask: "",
        addproject: "",
        date: "",
      });
      // if (!date) {
      //} else {
      //  const createdAt = new Date(date);
      // firebaseAddToDo({ addtask, uid, createdAt, addproject });
      //this.setState({
      // addtask: "",
      // addproject: "",
      //  date: "",
      //  });
      //  }
    } catch (error) {
      console.error(error);
    }
    setShowAddToDo();
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { setShowAddToDo, selectAllProjects } = this.props;
    return (
      <div className="addtodo">
        <h4>
          <span>+</span> Add New Task
        </h4>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <input
              name="addtask"
              type="text"
              placeholder="Add Task"
              onChange={this.handleChange}
              value={this.state.addtask}
              autoComplete="off"
              required
              autoFocus
            />
          </div>

          <div className="input-container">
            <select
              id="addproject"
              name="addproject"
              value={this.state.addproject}
              onChange={this.handleChange}
            >
              <option value="No Project">Choose a Project</option>
              {selectAllProjects.map((selectProject) => (
                <option key={selectProject.id} value={selectProject.addproject}>
                  {selectProject.addproject}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container"></div>
          <div className="button">
            <button type="submit" className="button__add">
              Add Task
            </button>
            <div className="button__cancel" onClick={setShowAddToDo}>
              cancel
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectCurrentUser: selectCurrentUser,
  selectAllProjects: selectAllProject,
});
const mapDispatchToProps = (dispatch) => ({
  setShowAddToDo: () => dispatch(setShowAddToDo()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Addtodo);
