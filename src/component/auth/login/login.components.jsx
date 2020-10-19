import React, { Component } from "react";
import "./login.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase.utils";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",
      loading: false,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      this.setState({
        loading: true,
      });
      await auth.signInWithEmailAndPassword(email, password);
      //const currentUserRef = auth.currentUser;
      //console.log(currentUserRef);
      //console.log(currentUserRef.displayName);
      //console.log(currentUserRef.photoURL);
      this.setState({
        email: "",
        password: "",
        errors: "",
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ errors: error.message, loading: false });
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login">
        <h2>Login Here</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <i className="fa fa-user icon"></i>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-container">
            <i className="fa fa-envelope  icon"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              label="password"
              required
            />
          </div>
          <button
            disabled={this.state.loading}
            className={this.state.loading ? "loading" : "submit-button"}
          >
            Submit
          </button>
        </form>
        {this.state.errors ? (
          <div className="error-link">
            <h3>Error</h3>
            {this.state.errors}
          </div>
        ) : null}

        <div className="signup-link">
          Don't have an Account ?
          <Link className="signup-link--link" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    );
  }
}
