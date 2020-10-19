import React, { Component } from "react";
import "./listprojects.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FaCircle, FaTrash } from "react-icons/fa";
import {
  clearProject,
  setProject,
  setShowListProjects,
} from "../../../../redux/projects/project.actions";
import { selectAllProject } from "../../../../redux/projects/project.selector";
import {
  auth,
  firestore,
  deleteProject,
} from "./../../../../firebase/firebase.utils";
export class ListProjects extends Component {
  unsubscribe = null;

  componentDidMount() {
    const { setProject, clearProject } = this.props;
    this.unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const showRef = await firestore
          .collection("Project")
          .where("uid", "==", userAuth.uid);
        showRef.onSnapshot((snap) => {
          let documents = [];
          snap.docs.map((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
            return documents;
          });
          console.log(documents);

          setProject(documents);
        });
      } else {
        await clearProject();
      }
    });
  }

  handleDelete = (id) => {
    deleteProject(id);
  };

  render() {
    const { selectProjects } = this.props;
    let output;
    if (!selectProjects.length) {
      output = (
        <div className="list-projects">
          <div className="list-projects__empty">No Projects</div>
          <hr />
        </div>
      );
    } else {
      output = (
        <div className="list-projects">
          <div className="list-projects__list">
            {selectProjects.map((selectProject) => (
              <ul key={selectProject.id}>
                <li className="list-projects__single">
                  <p>
                    <span className="list-projects__single--dot">
                      <FaCircle />
                    </span>
                    <span className="list-projects__single--projectname">
                      {selectProject.addproject}
                    </span>
                  </p>

                  <div
                    className="list-projects__single--trash"
                    onClick={() => this.handleDelete(selectProject.id)}
                  >
                    <FaTrash />
                  </div>
                </li>
              </ul>
            ))}
          </div>
          <hr />
        </div>
      );
    }

    return output;
  }
}
const mapStateToProps = createStructuredSelector({
  selectProjects: selectAllProject,
});
const mapDispatchToProps = (dispatch) => ({
  setProject: (projectMap) => dispatch(setProject(projectMap)),
  clearProject: () => dispatch(clearProject()),
  setShowListProjects: () => dispatch(setShowListProjects()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ListProjects);
