import React, { Component } from "react";
import "./signup.styles.scss";
import md5 from "md5";
import { Link } from "react-router-dom";
import { auth, saveUser } from "../../../firebase/firebase.utils";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: "",
      loading: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      console.log("Password do not match");
      this.setState({ errors: "Password do not match" });
      return;
    }

    this.setState({
      loading: true,
    });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        createdUser.user
          .updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
          })
          .then(() => {
            saveUser(createdUser).then(() => {
              console.log("user saved");
            });
          });

        console.log(createdUser);
        this.setState({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          errors: "",
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ errors: err.message, loading: false });
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-up">
        <h2>Sign-up Here</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <i className="fa fa-user icon"></i>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.username}
              required
            />
          </div>
          <div className="input-container">
            <i className="fa fa-envelope icon"></i>
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
            <i className="fa fa-key icon"></i>
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
          <div className="input-container">
            <i className="fa fa-repeat icon"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              label="confirmPassword"
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

        <div className="login-link">
          Are you already a User ?
          <Link className="login-link--link" to="/login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
export default Signup;
