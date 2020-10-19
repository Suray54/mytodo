import React, { Component } from "react";
import "./sidepanel.styles.scss";
import {
  //FaChevronDown,
  FaListAlt,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Addprojects from "./addprojects/addprojects.components";
import ListProjects from "./listprojects/listprojects.components";
import {
  showAddProjects,
  showListProjects,
} from "../../../redux/projects/project.selector";
import {
  setShowAddProjects,
  //setShowListProjects,
} from "../../../redux/projects/project.actions";
import {
  setTodoWithDate,
  setTodoWithDue,
  setTodoWithProject,
  setTodoWithToday,
} from "../../../redux/todo/todo.actions";

export class Sidepanel extends Component {
  render() {
    const {
      setShowAddProjects,
      showAddProjects,
      // setShowListProjects,
      showListProjects,
      setTodoWithDate,
      setTodoWithToday,
      setTodoWithDue,
      setTodoWithProject,
    } = this.props;
    return (
      <div className="sidepanel">
        <ul className="sidepanel__generic">
          <li
            className="inbox"
            onClick={() => setTodoWithDate("New Tasks On Top")}
          >
            <div>
              <span className="icon">
                <FaInbox />
              </span>
              <span>Arrange With Date</span>
            </div>
          </li>
          <li
            className="projects"
            onClick={() => setTodoWithProject("Sort By project")}
            //onClick={() => {
            // setShowListProjects();
            // }}
          >
            <span className={!showListProjects ? "reverse-icon icon " : "icon"}>
              <FaListAlt />
            </span>
            <span>By Projects</span>
          </li>
          <li
            className="today"
            onClick={() => setTodoWithToday("Completed Tasks")}
          >
            <div>
              <span className="icon">
                <FaRegCalendar />
              </span>
              <span>Completed</span>
            </div>
          </li>
          <li className="next_7" onClick={() => setTodoWithDue("Due Tasks")}>
            <div>
              <span className="icon">
                <FaRegCalendarAlt />
              </span>
              <span>Due Tasks</span>
            </div>
          </li>

          <hr />
        </ul>
        {showListProjects ? (
          <div className="sidepanel__projects">
            <ListProjects />
          </div>
        ) : null}

        {!showAddProjects ? (
          <div
            className="sidepanel__toogleprojects"
            onClick={() => setShowAddProjects(!showAddProjects)}
          >
            <p>
              <span>+</span> Add Project
            </p>
          </div>
        ) : (
          <div className="sidepanel__addprojects">
            <Addprojects />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  showAddProjects: showAddProjects,
  showListProjects: showListProjects,
});
const mapDispatchToProps = (dispatch) => ({
  setShowAddProjects: () => dispatch(setShowAddProjects()),
  //setShowListProjects: () => dispatch(setShowListProjects()),
  setTodoWithDate: (header) => dispatch(setTodoWithDate(header)),
  setTodoWithToday: (header) => dispatch(setTodoWithToday(header)),
  setTodoWithDue: (header) => dispatch(setTodoWithDue(header)),
  setTodoWithProject: (header) => dispatch(setTodoWithProject(header)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
