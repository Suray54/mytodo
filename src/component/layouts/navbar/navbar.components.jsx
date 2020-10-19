import React from "react";
import "./navbar.styles.scss";
import logowhite from "./../../../assets/logowhite.png";
import { auth } from "../../../firebase/firebase.utils";
import { FaSignOutAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { setShowAddToDo } from "../../../redux/todo/todo.actions";
export const Navbar = ({ setShowAddToDo }) => {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="header">
      <div className="navbar">
        <div className="logo" onClick={refreshPage}>
          <img src={logowhite} alt="logo" />
        </div>
        <ul className="options">
          <li
            title="AddTodo"
            className="options__todoadd"
            onClick={setShowAddToDo}
          >
            +
          </li>
          <li
            title="SignOut"
            className="options__signout"
            onClick={() => auth.signOut().then(() => console.log("signed out"))}
          >
            <FaSignOutAlt />
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setShowAddToDo: () => dispatch(setShowAddToDo()),
});
export default connect(null, mapDispatchToProps)(Navbar);
