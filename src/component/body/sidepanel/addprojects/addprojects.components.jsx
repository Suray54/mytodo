import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  setShowAddProjects,
  setShowListProjects,
} from "../../../../redux/projects/project.actions";
import { firebaseAddProject } from "./../../../../firebase/firebase.utils";
import { selectCurrentUser } from "../../../../redux/user/user.selector";

import "./addprojects.styles.scss";
export class Addprojects extends Component {
  state = { addproject: "" };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { addproject } = this.state;
    const { selectCurrentUser, setShowAddProjects } = this.props;
    const { uid } = selectCurrentUser;
    const createdAt = Date.now();
    try {
      firebaseAddProject({ addproject, uid, createdAt });
      this.setState({
        addproject: "",
      });
      setShowAddProjects();
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { setShowAddProjects } = this.props;
    return (
      <div className="addprojects">
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <input
              name="addproject"
              type="text"
              placeholder="Add Project"
              onChange={this.handleChange}
              value={this.state.addproject}
              autoComplete="off"
              required
              autoFocus
            />
          </div>
          <div className="button">
            <button type="submit" className="button__add">
              Add
            </button>
            <div
              className="button__cancel"
              onClick={() => setShowAddProjects()}
            >
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
});
const mapDispatchToProps = (dispatch) => ({
  setShowAddProjects: () => dispatch(setShowAddProjects()),
  setShowListProjects: () => dispatch(setShowListProjects()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Addprojects);
